"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

export default function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug }),
    });
    if (!res.ok) {
      const { error: message } = await res.json();
      setError(message ?? 'Could not create category.');
      return;
    }
    setName('');
    setSlug('');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Products in it will need reassigning first.')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Could not delete this category (it may still have products in it).');
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <div className="glass-panel" style={{ marginBottom: '2rem', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add Category</h3>
        <form onSubmit={handleAdd}>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="DNA Creatine Bar" />
            </div>
            <div className="admin-field">
              <label>Slug</label>
              <input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="creatine" />
            </div>
          </div>
          {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn-primary">Add Category</button>
        </form>
      </div>

      <div className="glass-panel">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Slug</th><th>Products</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>{c._count.products}</td>
                <td><button className="admin-link-btn admin-link-btn--danger" onClick={() => handleDelete(c.id)}>Delete</button></td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
