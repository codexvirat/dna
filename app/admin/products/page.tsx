import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatRupees } from '@/lib/currency';
import ProductRowActions from '@/components/admin/ProductRowActions';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="text-gradient" style={{ margin: 0 }}>Products</h1>
        <Link href="/admin/products/new" className="btn-primary">+ New Product</Link>
      </div>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link href={`/admin/products/${product.id}/edit`}>{product.name}</Link>
                  {product.flavor && <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{product.flavor}</div>}
                </td>
                <td>{product.category.name}</td>
                <td>{formatRupees(product.priceInPaise)}</td>
                <td>{product.stock}</td>
                <td>{product.isActive ? 'Active' : 'Inactive'}</td>
                <td><ProductRowActions productId={product.id} isActive={product.isActive} /></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
