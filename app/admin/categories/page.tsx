import React from 'react';
import { prisma } from '@/lib/prisma';
import CategoryManager from '@/components/admin/CategoryManager';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Categories</h1>
      <CategoryManager categories={categories} />
    </div>
  );
}
