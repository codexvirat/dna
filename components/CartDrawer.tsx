"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatRupees } from '@/lib/currency';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotalInPaise } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <aside className="cart-drawer">
        <div className="cart-drawer-header">
          <h3 style={{ margin: 0 }}>Your Cart</h3>
          <button className="cart-drawer-close" onClick={closeCart} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn-secondary" onClick={closeCart}>Shop Now</Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {items.map((item) => (
                <div className="cart-drawer-item" key={item.productId}>
                  <div className="cart-drawer-item-image">
                    {item.image && (
                      <Image src={item.image} alt={item.name} width={64} height={64} style={{ objectFit: 'contain' }} />
                    )}
                  </div>
                  <div className="cart-drawer-item-info">
                    <div className="cart-drawer-item-name">{item.name}</div>
                    {item.flavor && <div className="cart-drawer-item-flavor">{item.flavor}</div>}
                    <div className="cart-drawer-item-controls">
                      <div className="cart-qty-stepper">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                      </div>
                      <span>{formatRupees(item.priceInPaise * item.quantity)}</span>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeItem(item.productId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-drawer-subtotal">
                <span>Subtotal</span>
                <span>{formatRupees(subtotalInPaise)}</span>
              </div>
              <Link href="/cart" className="btn-secondary" style={{ width: '100%' }} onClick={closeCart}>View Cart</Link>
              <Link href="/checkout" className="btn-primary" style={{ width: '100%' }} onClick={closeCart}>Checkout</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
