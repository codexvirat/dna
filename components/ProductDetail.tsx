"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatRupees } from '@/lib/currency';
import '@/app/shop/[slug]/product-detail.css';

const NUTRITION_LABELS: Record<string, { label: string; unit: string }> = {
  energyKcal: { label: 'Energy', unit: 'kcal' },
  proteinG: { label: 'Protein', unit: 'g' },
  carbsG: { label: 'Carbohydrates', unit: 'g' },
  fatG: { label: 'Total Fat', unit: 'g' },
  fiberG: { label: 'Dietary Fiber', unit: 'g' },
  sugarG: { label: 'Sugar', unit: 'g' },
};

interface ProductDetailProps {
  id: string;
  slug: string;
  name: string;
  flavor: string | null;
  categoryName: string;
  description: string;
  priceInPaise: number;
  compareAtPriceInPaise: number | null;
  weightGrams: number | null;
  proteinGrams: number | null;
  nutrition: Record<string, number> | null;
  images: string[];
  stock: number;
}

export default function ProductDetail({
  id, slug, name, flavor, categoryName, description, priceInPaise, compareAtPriceInPaise,
  weightGrams, proteinGrams, nutrition, images, stock,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const outOfStock = stock <= 0;

  const handleAddToCart = () => {
    addItem({ productId: id, slug, name, flavor, priceInPaise, image: images[0], stock }, quantity);
  };

  return (
    <div className="product-detail-grid">
      <div>
        <div className="product-gallery-main animate-float">
          {images[activeImage] && (
            <Image src={images[activeImage]} alt={name} width={450} height={450} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
          )}
        </div>
        {images.length > 1 && (
          <div className="product-gallery-thumbs">
            {images.map((img, index) => (
              <button
                key={img}
                className={`product-gallery-thumb${index === activeImage ? ' product-gallery-thumb--active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <Image src={img} alt={`${name} thumbnail ${index + 1}`} width={56} height={56} style={{ objectFit: 'contain' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <span className="spec-badge">{categoryName}</span>
        <h1 className="text-gradient" style={{ marginTop: '1rem' }}>{name}</h1>
        {flavor && <p style={{ fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{flavor}</p>}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', margin: '1rem 0' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700 }}>{formatRupees(priceInPaise)}</span>
          {compareAtPriceInPaise != null && (
            <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)' }}>
              {formatRupees(compareAtPriceInPaise)}
            </span>
          )}
        </div>

        <p>{description}</p>

        <div className="product-specs">
          {weightGrams != null && <span className="spec-badge">{weightGrams}g Bar</span>}
          {proteinGrams != null && <span className="spec-badge">{proteinGrams}g Protein</span>}
        </div>

        {nutrition && (
          <>
            <h3 style={{ marginTop: '2rem' }}>Nutrition Information</h3>
            <table className="nutrition-table">
              <tbody>
                {Object.entries(nutrition).map(([key, value]) => {
                  const meta = NUTRITION_LABELS[key];
                  return (
                    <tr key={key}>
                      <td>{meta?.label ?? key}</td>
                      <td>{value}{meta?.unit ?? ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '30px', padding: '0.25rem 0.5rem' }}>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.4rem' }}
            >-</button>
            <span style={{ width: '32px', textAlign: 'center', fontWeight: 'bold' }}>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
              disabled={quantity >= stock}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.2rem' }}
            >+</button>
          </div>
          <button className="btn-primary" style={{ flex: 1, padding: '1rem' }} onClick={handleAddToCart} disabled={outOfStock}>
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
