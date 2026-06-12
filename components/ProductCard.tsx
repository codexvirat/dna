"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  flavor: string;
  protein: string;
  benefits: string;
  imageSrc: string;
}

export default function ProductCard({ id, name, flavor, protein, benefits, imageSrc }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-card glass-panel">
      <div className="product-image-container animate-float">
        <Image 
          src={imageSrc} 
          alt={`${name} - ${flavor}`} 
          width={400} 
          height={200} 
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name text-gradient">{name}</h3>
        <p className="product-flavor">{flavor}</p>
        <div className="product-specs">
          <span className="spec-badge">{protein} Protein</span>
        </div>
        <p className="product-benefits">{benefits}</p>
        
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
            >
              +
            </button>
          </div>
          <button className="btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
