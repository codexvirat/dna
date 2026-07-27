import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Edit Product</h1>
      <ProductForm
        categories={categories}
        initialValues={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          categoryId: product.categoryId,
          flavor: product.flavor ?? '',
          description: product.description,
          priceInRupees: (product.priceInPaise / 100).toString(),
          compareAtPriceInRupees: product.compareAtPriceInPaise != null ? (product.compareAtPriceInPaise / 100).toString() : '',
          weightGrams: product.weightGrams?.toString() ?? '',
          proteinGrams: product.proteinGrams?.toString() ?? '',
          images: product.images.join(', '),
          nutrition: product.nutrition ? JSON.stringify(product.nutrition) : '',
          stock: product.stock.toString(),
          isActive: product.isActive,
        }}
      />
    </div>
  );
}
