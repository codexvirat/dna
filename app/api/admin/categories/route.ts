import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// ─── GET /api/admin/categories — list all categories ───────────────────
export async function GET() {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ categories });
}

// ─── POST /api/admin/categories — create a category ─────────────────────
export async function POST(req: NextRequest) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const { name, slug } = await req.json();
  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required.' }, { status: 400 });
  }

  const category = await prisma.category.create({ data: { name, slug } });
  return NextResponse.json({ success: true, category }, { status: 201 });
}
