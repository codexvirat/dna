"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ProductRowActions({ productId, isActive }: { productId: string; isActive: boolean }) {
  const router = useRouter();

  const toggleActive = async () => {
    await fetch(`/api/admin/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !isActive }),
    });
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Could not delete this product (it may already have orders against it).');
      return;
    }
    router.refresh();
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button className="admin-link-btn" onClick={toggleActive}>{isActive ? 'Deactivate' : 'Activate'}</button>
      <button className="admin-link-btn admin-link-btn--danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}
