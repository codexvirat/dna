/**
 * Prisma client singleton for Next.js
 * Uses @prisma/adapter-pg with the direct DATABASE_URL from prisma.config.ts
 * (Prisma 7 requires an explicit adapter)
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// The prisma dev server exposes a direct postgres URL.
// We use the raw postgres:// URL (not the prisma+proxy wrapper) for the adapter.
const directUrl =
  process.env.DIRECT_DATABASE_URL ??
  'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=10&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&socket_timeout=0';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: directUrl }),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
