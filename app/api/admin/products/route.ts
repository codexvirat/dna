import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// ─── GET /api/admin/products — list all products (incl. inactive) ────
export async function GET() {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ products });
}

// ─── POST /api/admin/products — create a product ──────────────────────
export async function POST(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const body = await req.json();
  const {
    name, slug, categoryId, flavor, description,
    priceInPaise, compareAtPriceInPaise, weightGrams, proteinGrams,
    nutrition, images, stock, isActive,
  } = body;

  if (!name || !slug || !categoryId || !description || priceInPaise == null) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name, slug, categoryId, flavor, description,
      priceInPaise, compareAtPriceInPaise, weightGrams, proteinGrams,
      nutrition, images: images ?? [], stock: stock ?? 0, isActive: isActive ?? true,
    },
  });

  return NextResponse.json({ success: true, product }, { status: 201 });
}
