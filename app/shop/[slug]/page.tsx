import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetail from '@/components/ProductDetail';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <main className="container section-padding">
      <ProductDetail
        id={product.id}
        slug={product.slug}
        name={product.name}
        flavor={product.flavor}
        categoryName={product.category.name}
        description={product.description}
        priceInPaise={product.priceInPaise}
        compareAtPriceInPaise={product.compareAtPriceInPaise}
        weightGrams={product.weightGrams}
        proteinGrams={product.proteinGrams}
        nutrition={product.nutrition as Record<string, number> | null}
        images={product.images}
        stock={product.stock}
      />
    </main>
  );
}
