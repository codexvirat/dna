import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPaymentOrder, verifyPayment } from '@/lib/payments';

// ─── POST /api/orders/[id]/confirm — run (mock) payment and confirm the order ───
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  }
  if (order.status !== 'PENDING') {
    return NextResponse.json({ error: 'Order already processed.' }, { status: 409 });
  }

  const paymentOrder = await createPaymentOrder(order.totalInPaise);
  const verification = await verifyPayment(paymentOrder.paymentOrderId);

  if (!verification.success) {
    return NextResponse.json({ error: 'Payment failed.' }, { status: 402 });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: {
      status: 'CONFIRMED',
      razorpayOrderId: paymentOrder.paymentOrderId,
      razorpayPaymentId: verification.paymentId,
    },
  });

  return NextResponse.json({ success: true, order: updated });
}
