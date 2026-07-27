import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// ─── POST /api/register — create a new customer account ──────────────
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body as { name?: string; email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email } }, { status: 201 });
}
