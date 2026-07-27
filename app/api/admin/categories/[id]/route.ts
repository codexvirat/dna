import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// ─── PATCH /api/admin/categories/[id] — update a category ──────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const { id } = await params;
  const { name, slug } = await req.json();

  const category = await prisma.category.update({ where: { id }, data: { name, slug } });
  return NextResponse.json({ success: true, category });
}

// ─── DELETE /api/admin/categories/[id] ──────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.authorized) return check.response;

  const { id } = await params;
  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
