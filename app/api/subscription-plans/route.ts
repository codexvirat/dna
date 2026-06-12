import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/** GET /api/subscription-plans — returns all active plans (public) */
export async function GET() {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    orderBy: { priceInPaise: 'asc' },
  });
  return NextResponse.json({ plans });
}
