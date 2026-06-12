import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

/** Helper — add days to a date */
function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getFirstDeliveryDate(frequency: string): Date {
  const now = new Date();
  switch (frequency) {
    case 'WEEKLY':    return addDays(now, 7);
    case 'BIWEEKLY':  return addDays(now, 14);
    case 'MONTHLY':
    default:          return addDays(now, 30);
  }
}

// ─── GET /api/subscriptions — list logged-in user's subscriptions ─────
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { startedAt: 'desc' },
      },
    },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ subscriptions: user.subscriptions });
}

// ─── POST /api/subscriptions — create a new subscription ─────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { planId, flavor, quantity = 1, address } = body;

  if (!planId || !flavor) {
    return NextResponse.json({ error: 'planId and flavor are required.' }, { status: 400 });
  }

  const validFlavors = ['BLUEBERRY_MUFFIN', 'CHOCO_ALMOND', 'MIXED'];
  if (!validFlavors.includes(flavor)) {
    return NextResponse.json({ error: 'Invalid flavor.' }, { status: 400 });
  }

  const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } });
  if (!plan || !plan.isActive) {
    return NextResponse.json({ error: 'Plan not found or inactive.' }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Check if user already has an active subscription for this plan
  const existing = await prisma.productSubscription.findFirst({
    where: { userId: user.id, planId, status: 'ACTIVE' },
  });
  if (existing) {
    return NextResponse.json(
      { error: 'You already have an active subscription for this plan.' },
      { status: 409 }
    );
  }

  const subscription = await prisma.productSubscription.create({
    data: {
      userId: user.id,
      planId,
      flavor,
      quantity: Math.max(1, Math.min(quantity, 10)),
      nextDeliveryDate: getFirstDeliveryDate(plan.frequency),
      address: address ?? null,
    },
    include: { plan: true },
  });

  return NextResponse.json({ success: true, subscription }, { status: 201 });
}
