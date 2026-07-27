"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatRupees } from '@/lib/currency';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  flavor: string | null;
  proteinGrams: number | null;
  description: string;
  priceInPaise: number;
  images: string[];
  stock: number;
}

export default function ProductCard({ id, slug, name, flavor, proteinGrams, description, priceInPaise, images, stock }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const imageSrc = images[0];
  const outOfStock = stock <= 0;

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(
      { productId: id, slug, name, flavor, priceInPaise, image: imageSrc, stock },
      quantity
    );
  };

  return (
    <div className="product-card glass-panel">
      <Link href={`/shop/${slug}`} className="product-image-container animate-float">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={flavor ? `${name} - ${flavor}` : name}
            width={400}
            height={200}
            className="product-image"
          />
        )}
      </Link>
      <div className="product-info">
        <Link href={`/shop/${slug}`}>
          <h3 className="product-name text-gradient">{name}</h3>
        </Link>
        {flavor && <p className="product-flavor">{flavor}</p>}
        <div className="product-specs">
          {proteinGrams != null && <span className="spec-badge">{proteinGrams}g Protein</span>}
          <span className="spec-badge">{formatRupees(priceInPaise)}</span>
        </div>
        <p className="product-benefits">{description}</p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '30px', padding: '0.25rem 0.5rem' }}>
            <button
              onClick={decrement}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: quantity <= 1 ? 0.5 : 1 }}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {quantity}
            </span>
            <button
              onClick={increment}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              disabled={quantity >= stock}
            >
              +
            </button>
          </div>
          <button className="btn-primary" style={{ flex: 1, padding: '0.75rem' }} onClick={handleAddToCart} disabled={outOfStock}>
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
