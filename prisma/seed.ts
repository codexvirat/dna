/**
 * Seed subscription plans, shop categories/products, and a dev admin user for DNA Bars.
 * Run: npx ts-node prisma/seed.ts  (or add to package.json prisma.seed)
 */
import { PrismaClient, FrequencyType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const directUrl =
  process.env.DIRECT_DATABASE_URL ??
  'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=10&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&socket_timeout=0';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: directUrl }) });

// NOTE: prices/weights/nutrition below are placeholders — product specs are still under
// testing per data/data.md. Update via the admin panel once real numbers are finalized.
const categories = [
  { name: 'DNA Creatine Bar', slug: 'creatine' },
  { name: 'DNA Collagen Bar', slug: 'collagen' },
];

const products = [
  {
    name: 'DNA Creatine Bar - Choco Almond',
    slug: 'dna-creatine-bar-choco-almond',
    categorySlug: 'creatine',
    flavor: 'Choco Almond',
    description:
      'Clean-label creatine bar built for daily performance and recovery. Cold-pressed, zero waxy binders, real food ingredients.',
    priceInPaise: 49900, // ₹499 — placeholder
    compareAtPriceInPaise: null,
    weightGrams: 60,
    proteinGrams: 10,
    nutrition: { energyKcal: 220, proteinG: 10, carbsG: 22, fatG: 9, fiberG: 4, sugarG: 6 },
    images: ['/assets/product2.png'],
    stock: 100,
  },
  {
    name: 'DNA Collagen Bar - Blueberry Butterscotch',
    slug: 'dna-collagen-bar-blueberry-butterscotch',
    categorySlug: 'collagen',
    flavor: 'Blueberry Butterscotch', // flavor undecided per data/data.md, may change
    description:
      'Radiant skin and inner wellness bar with collagen builders and glutamine. Cold-pressed, zero waxy binders, real food ingredients.',
    priceInPaise: 49900, // ₹499 — placeholder
    compareAtPriceInPaise: null,
    weightGrams: 60,
    proteinGrams: 10,
    nutrition: { energyKcal: 210, proteinG: 10, carbsG: 20, fatG: 8, fiberG: 4, sugarG: 7 },
    images: ['/assets/product1.png'],
    stock: 100,
  },
];

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

  console.log('🌱 Seeding shop categories...');
  const categoryIdBySlug = new Map<string, string>();
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    categoryIdBySlug.set(category.slug, created.id);
    console.log(`  ✓ ${category.name} category`);
  }

  console.log('🌱 Seeding shop products...');
  for (const { categorySlug, ...product } of products) {
    const categoryId = categoryIdBySlug.get(categorySlug)!;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, categoryId },
      create: { ...product, categoryId },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log('🌱 Seeding dev admin user...');
  const adminEmail = 'admin@dnabars.com';
  const adminPassword = await bcrypt.hash('DnaAdmin123!', 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN', password: adminPassword },
    create: { email: adminEmail, name: 'DNA Admin', password: adminPassword, role: 'ADMIN' },
  });
  console.log(`  ✓ Admin user ready — login with ${adminEmail} / DnaAdmin123!`);

  console.log('✅ Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
