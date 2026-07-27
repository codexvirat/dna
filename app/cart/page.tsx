"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatRupees } from '@/lib/currency';
import './cart.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotalInPaise } = useCart();

  if (items.length === 0) {
    return (
      <main className="container section-padding text-center">
        <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          Looks like you haven&apos;t added any DNA Bars yet.
        </p>
        <Link href="/shop" className="btn-primary">Shop Now</Link>
      </main>
    );
  }

  return (
    <main className="container section-padding">
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Your Cart</h1>

      <div className="cart-page-grid">
        <div className="glass-panel">
          {items.map((item) => (
            <div className="cart-line-item" key={item.productId}>
              <div className="cart-line-image">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={80} height={80} style={{ objectFit: 'contain' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                {item.flavor && <p style={{ marginBottom: '0.75rem' }}>{item.flavor}</p>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div className="cart-qty-stepper" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '32px', height: '32px', cursor: 'pointer' }}
                    >-</button>
                    <span style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '32px', height: '32px', cursor: 'pointer' }}
                    >+</button>
                  </div>
                  <span style={{ fontWeight: 600 }}>{formatRupees(item.priceInPaise * item.quantity)}</span>
                  <button
                    onClick={() => removeItem(item.productId)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer', marginLeft: 'auto' }}
                  >Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>{formatRupees(subtotalInPaise)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>{formatRupees(subtotalInPaise)}</span>
          </div>
          <Link href="/checkout" className="btn-primary" style={{ width: '100%' }}>Proceed to Checkout</Link>
        </div>
      </div>
    </main>
  );
}
