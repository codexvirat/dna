import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <div>
      <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
