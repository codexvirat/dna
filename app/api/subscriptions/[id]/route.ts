import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// ─── GET /api/subscriptions/[id] — single subscription detail ────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const subscription = await prisma.productSubscription.findFirst({
    where: { id, userId: user.id },
    include: { plan: true },
  });

  if (!subscription) {
    return NextResponse.json({ error: 'Subscription not found.' }, { status: 404 });
  }

  return NextResponse.json({ subscription });
}

// ─── PATCH /api/subscriptions/[id] — pause / resume / cancel ─────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { action } = body as { action: 'pause' | 'resume' | 'cancel' };

  const validActions = ['pause', 'resume', 'cancel'];
  if (!validActions.includes(action)) {
    return NextResponse.json({ error: 'Invalid action. Use pause | resume | cancel.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const subscription = await prisma.productSubscription.findFirst({
    where: { id, userId: user.id },
    include: { plan: true },
  });

  if (!subscription) {
    return NextResponse.json({ error: 'Subscription not found.' }, { status: 404 });
  }

  // Guard state transitions
  if (action === 'pause' && subscription.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Only active subscriptions can be paused.' }, { status: 400 });
  }
  if (action === 'resume' && subscription.status !== 'PAUSED') {
    return NextResponse.json({ error: 'Only paused subscriptions can be resumed.' }, { status: 400 });
  }
  if (action === 'cancel' && subscription.status === 'CANCELLED') {
    return NextResponse.json({ error: 'Subscription is already cancelled.' }, { status: 400 });
  }

  const statusMap = { pause: 'PAUSED', resume: 'ACTIVE', cancel: 'CANCELLED' } as const;

  // On resume, recalculate next delivery
  let nextDeliveryDate = subscription.nextDeliveryDate;
  if (action === 'resume') {
    const daysMap: Record<string, number> = { WEEKLY: 7, BIWEEKLY: 14, MONTHLY: 30 };
    const days = daysMap[subscription.plan.frequency] ?? 30;
    const d = new Date();
    d.setDate(d.getDate() + days);
    nextDeliveryDate = d;
  }

  const updated = await prisma.productSubscription.update({
    where: { id },
    data: { status: statusMap[action], nextDeliveryDate },
    include: { plan: true },
  });

  return NextResponse.json({ success: true, subscription: updated });
}
