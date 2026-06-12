/**
 * Seed subscription plans for DNA Bars.
 * Run: npx ts-node prisma/seed.ts  (or add to package.json prisma.seed)
 */
import { PrismaClient, FrequencyType } from '@prisma/client';

const prisma = new PrismaClient();

const plans = [
  {
    name: 'Starter',
    slug: 'starter',
    description: 'Perfect intro to the DNA lifestyle. One box every month.',
    frequency: FrequencyType.MONTHLY,
    barsPerBox: 12,
    priceInPaise: 99900,   // ₹999
    discountPct: 10,
    isPopular: false,
  },
  {
    name: 'Athlete',
    slug: 'athlete',
    description: 'For the serious performer. A fresh box every two weeks.',
    frequency: FrequencyType.BIWEEKLY,
    barsPerBox: 12,
    priceInPaise: 179900,  // ₹1,799
    discountPct: 15,
    isPopular: true,
  },
  {
    name: 'Elite',
    slug: 'elite',
    description: 'Maximum fuel. Weekly delivery for peak performance.',
    frequency: FrequencyType.WEEKLY,
    barsPerBox: 12,
    priceInPaise: 319900,  // ₹3,199
    discountPct: 20,
    isPopular: false,
  },
];

async function main() {
  console.log('🌱 Seeding subscription plans...');
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
    console.log(`  ✓ ${plan.name} plan`);
  }
  console.log('✅ Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
