"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatRupees } from '@/lib/currency';
import './checkout.css';

const FREE_SHIPPING_THRESHOLD_PAISE = 99900;
const FLAT_SHIPPING_PAISE = 4900;

type Step = 'form' | 'processing';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalInPaise, clear } = useCart();
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
  });

  const shippingInPaise = subtotalInPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : FLAT_SHIPPING_PAISE;
  const totalInPaise = subtotalInPaise + shippingInPaise;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('processing');

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          ...form,
        }),
      });

      if (!orderRes.ok) {
        const { error: message } = await orderRes.json();
        setError(message ?? 'Could not create order.');
        setStep('form');
        return;
      }

      const { orderId } = await orderRes.json();

      const confirmRes = await fetch(`/api/orders/${orderId}/confirm`, { method: 'POST' });
      if (!confirmRes.ok) {
        const { error: message } = await confirmRes.json();
        setError(message ?? 'Payment failed.');
        setStep('form');
        return;
      }

      clear();
      router.push(`/order-confirmation/${orderId}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setStep('form');
    }
  };

  if (items.length === 0) {
    return (
      <main className="container section-padding text-center">
        <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>Nothing to Check Out</h1>
        <p style={{ marginBottom: '2rem' }}>Your cart is empty.</p>
        <Link href="/shop" className="btn-primary">Shop Now</Link>
      </main>
    );
  }

  return (
    <main className="container section-padding">
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div className="checkout-grid">
        <form className="glass-panel" onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '1.5rem' }}>Shipping Details</h3>

          <div className="checkout-field">
            <label>Full Name</label>
            <input required value={form.customerName} onChange={handleChange('customerName')} />
          </div>
          <div className="checkout-field-row">
            <div className="checkout-field">
              <label>Email</label>
              <input required type="email" value={form.customerEmail} onChange={handleChange('customerEmail')} />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input required type="tel" value={form.customerPhone} onChange={handleChange('customerPhone')} />
            </div>
          </div>
          <div className="checkout-field">
            <label>Address</label>
            <input required value={form.shippingAddress} onChange={handleChange('shippingAddress')} />
          </div>
          <div className="checkout-field-row">
            <div className="checkout-field">
              <label>City</label>
              <input required value={form.shippingCity} onChange={handleChange('shippingCity')} />
            </div>
            <div className="checkout-field">
              <label>State</label>
              <input required value={form.shippingState} onChange={handleChange('shippingState')} />
            </div>
          </div>
          <div className="checkout-field">
            <label>Pincode</label>
            <input required value={form.shippingPincode} onChange={handleChange('shippingPincode')} />
          </div>

          {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={step === 'processing'}>
            {step === 'processing' ? 'Processing Payment...' : `Pay ${formatRupees(totalInPaise)}`}
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', textAlign: 'center' }}>
            Payment is simulated for now — no real charge will be made.
          </p>
        </form>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          {items.map((item) => (
            <div className="checkout-summary-item" key={item.productId}>
              <span>{item.name} × {item.quantity}</span>
              <span>{formatRupees(item.priceInPaise * item.quantity)}</span>
            </div>
          ))}
          <div className="checkout-summary-item">
            <span>Shipping</span>
            <span>{shippingInPaise === 0 ? 'Free' : formatRupees(shippingInPaise)}</span>
          </div>
          <div className="cart-summary-total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 700, paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem' }}>
            <span>Total</span>
            <span>{formatRupees(totalInPaise)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
