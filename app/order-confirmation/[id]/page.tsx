import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatRupees } from '@/lib/currency';

export const dynamic = 'force-dynamic';

interface OrderConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="container section-padding" style={{ maxWidth: '700px' }}>
      <div className="glass-panel text-center" style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>
          {order.status === 'CONFIRMED' ? 'Order Confirmed!' : 'Order Received'}
        </h1>
        <p>Order #{order.id.slice(-8).toUpperCase()} — Status: {order.status}</p>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Order Details</h3>
        {order.items.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--glass-border)' }}>
            <span>{item.name}{item.flavor ? ` (${item.flavor})` : ''} × {item.quantity}</span>
            <span>{formatRupees(item.priceInPaise * item.quantity)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', color: 'var(--text-secondary)' }}>
          <span>Shipping</span>
          <span>{order.shippingInPaise === 0 ? 'Free' : formatRupees(order.shippingInPaise)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
          <span>Total</span>
          <span>{formatRupees(order.totalInPaise)}</span>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Shipping To</h3>
        <p>{order.customerName}</p>
        <p>{order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingPincode}</p>
        <p>{order.customerEmail} · {order.customerPhone}</p>
      </div>

      <div className="text-center">
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </main>
  );
}
