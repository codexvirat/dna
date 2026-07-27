import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Shop({ searchParams }: ShopPageProps) {
  const { category: activeCategorySlug } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.product.findMany({
      where: {
        isActive: true,
        ...(activeCategorySlug ? { category: { slug: activeCategorySlug } } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  return (
    <main className="container section-padding">
      {/* Hero Section */}
      <section className="text-center" style={{ marginBottom: '4rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '100px', background: 'var(--accent-cyan-glow)', filter: 'blur(100px)', zIndex: -1 }}></div>
        <h1 className="text-gradient animate-float" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1rem' }}>
          Shop DNA Bars
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Elevate your performance with our premium, scientifically formulated protein bars. The ultimate triple-threat formula.
        </p>
      </section>

      {/* Trust & Benefit Bar */}
      <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', background: 'rgba(0, 243, 255, 0.03)', border: '1px solid rgba(0, 243, 255, 0.1)' }}>
        {[
          { icon: "⚡", text: "Premium Ingredients" },
          { icon: "🚀", text: "Free Shipping Over ₹999" },
          { icon: "🔒", text: "Secure Checkout" },
          { icon: "💪", text: "Formulated for Aesthetics" }
        ].map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.5))' }}>{item.icon}</span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>{item.text}</span>
          </div>
        ))}
      </section>

      {/* Category Filters */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        <Link
          href="/shop"
          className="btn-secondary"
          style={{
            padding: '0.6rem 2rem',
            fontSize: '0.95rem',
            borderRadius: '30px',
            borderColor: !activeCategorySlug ? 'var(--accent-cyan)' : 'var(--glass-border)',
            color: !activeCategorySlug ? 'var(--accent-cyan)' : 'var(--text-primary)',
            background: !activeCategorySlug ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600
          }}
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="btn-secondary"
            style={{
              padding: '0.6rem 2rem',
              fontSize: '0.95rem',
              borderRadius: '30px',
              borderColor: activeCategorySlug === category.slug ? 'var(--accent-cyan)' : 'var(--glass-border)',
              color: activeCategorySlug === category.slug ? 'var(--accent-cyan)' : 'var(--text-primary)',
              background: activeCategorySlug === category.slug ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}
          >
            {category.name}
          </Link>
        ))}
      </section>

      {/* Product Grid */}
      <section className="grid-2" style={{ position: 'relative' }}>
        {/* Subtle background glow for the grid */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '400px', height: '400px', background: 'var(--accent-purple-glow)', filter: 'blur(150px)', zIndex: -1, opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'var(--accent-cyan-glow)', filter: 'blur(150px)', zIndex: -1, opacity: 0.4 }}></div>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No products found in this category yet.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              flavor={product.flavor}
              proteinGrams={product.proteinGrams}
              description={product.description}
              priceInPaise={product.priceInPaise}
              images={product.images}
              stock={product.stock}
            />
          ))
        )}
      </section>
    </main>
  );
}
