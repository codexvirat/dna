const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const directUrl = process.env.DIRECT_DATABASE_URL ||
  'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=10&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&socket_timeout=0';

const adapter = new PrismaPg({ connectionString: directUrl });
const prisma = new PrismaClient({ adapter });

const plans = [
  {
    name: 'Starter',
    slug: 'starter',
    description: 'Perfect intro to the DNA lifestyle. One box every month.',
    frequency: 'MONTHLY',
    barsPerBox: 12,
    priceInPaise: 99900,
    discountPct: 10,
    isPopular: false,
  },
  {
    name: 'Athlete',
    slug: 'athlete',
    description: 'For the serious performer. A fresh box every two weeks.',
    frequency: 'BIWEEKLY',
    barsPerBox: 12,
    priceInPaise: 179900,
    discountPct: 15,
    isPopular: true,
  },
  {
    name: 'Elite',
    slug: 'elite',
    description: 'Maximum fuel. Weekly delivery for peak performance.',
    frequency: 'WEEKLY',
    barsPerBox: 12,
    priceInPaise: 319900,
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
