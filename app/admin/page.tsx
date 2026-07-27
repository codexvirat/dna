import React from 'react';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Dashboard</h1>
      <div className="grid-2">
        <Link href="/admin/products" className="glass-panel">
          <h3>Products</h3>
          <p>Manage the product catalog, pricing, and stock.</p>
        </Link>
        <Link href="/admin/categories" className="glass-panel">
          <h3>Categories</h3>
          <p>Manage product categories.</p>
        </Link>
      </div>
    </div>
  );
}
