import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const FREE_SHIPPING_THRESHOLD_PAISE = 99900; // ₹999
const FLAT_SHIPPING_PAISE = 4900; // ₹49

interface OrderItemInput {
  productId: string;
  quantity: number;
}

// ─── POST /api/orders — create an order from the cart (guest checkout allowed) ───
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    items,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingPincode,
  } = body as {
    items: OrderItemInput[];
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPincode?: string;
  };

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }
  if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !shippingCity || !shippingState || !shippingPincode) {
    return NextResponse.json({ error: 'Missing shipping details.' }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productById = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productById.get(item.productId);
    if (!product || !product.isActive) {
      return NextResponse.json({ error: `Product not found or unavailable.` }, { status: 404 });
    }
    if (item.quantity < 1 || item.quantity > product.stock) {
      return NextResponse.json({ error: `Insufficient stock for ${product.name}.` }, { status: 409 });
    }
  }

  const subtotalInPaise = items.reduce((sum, item) => {
    const product = productById.get(item.productId)!;
    return sum + product.priceInPaise * item.quantity;
  }, 0);
  const shippingInPaise = subtotalInPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : FLAT_SHIPPING_PAISE;
  const totalInPaise = subtotalInPaise + shippingInPaise;

  const session = await auth();
  const user = session?.user?.email
    ? await prisma.user.findUnique({ where: { email: session.user.email } })
    : null;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: user?.id,
        subtotalInPaise,
        shippingInPaise,
        totalInPaise,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingPincode,
        items: {
          create: items.map((item) => {
            const product = productById.get(item.productId)!;
            return {
              productId: product.id,
              name: product.name,
              flavor: product.flavor,
              priceInPaise: product.priceInPaise,
              quantity: item.quantity,
            };
          }),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  return NextResponse.json({ success: true, orderId: order.id, totalInPaise }, { status: 201 });
}
