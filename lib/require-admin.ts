import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return { authorized: false as const, response: NextResponse.json({ error: 'Unauthorized' }, { status: 403 }) };
  }
  return { authorized: true as const };
}
