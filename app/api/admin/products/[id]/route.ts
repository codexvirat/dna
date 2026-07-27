import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// ─── PATCH /api/admin/products/[id] — update a product ────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const { id } = await params;
  const body = await req.json();
  const {
    name, slug, categoryId, flavor, description,
    priceInPaise, compareAtPriceInPaise, weightGrams, proteinGrams,
    nutrition, images, stock, isActive,
  } = body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name, slug, categoryId, flavor, description,
      priceInPaise, compareAtPriceInPaise, weightGrams, proteinGrams,
      nutrition, images, stock, isActive,
    },
  });

  return NextResponse.json({ success: true, product });
}

// ─── DELETE /api/admin/products/[id] ───────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const { id } = await params;
  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
