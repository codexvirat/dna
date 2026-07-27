"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormValues {
  id?: string;
  name: string;
  slug: string;
  categoryId: string;
  flavor: string;
  description: string;
  priceInRupees: string;
  compareAtPriceInRupees: string;
  weightGrams: string;
  proteinGrams: string;
  images: string;
  nutrition: string;
  stock: string;
  isActive: boolean;
}

interface ProductFormProps {
  categories: CategoryOption[];
  initialValues?: Partial<ProductFormValues>;
}

const emptyValues: ProductFormValues = {
  name: '', slug: '', categoryId: '', flavor: '', description: '',
  priceInRupees: '', compareAtPriceInRupees: '', weightGrams: '', proteinGrams: '',
  images: '', nutrition: '', stock: '0', isActive: true,
};

export default function ProductForm({ categories, initialValues }: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({ ...emptyValues, ...initialValues });
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isEdit = Boolean(values.id);

  const update = (field: keyof ProductFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let nutrition = null;
    if (values.nutrition.trim()) {
      try {
        nutrition = JSON.parse(values.nutrition);
      } catch {
        setError('Nutrition must be valid JSON, e.g. {"energyKcal": 220, "proteinG": 10}');
        return;
      }
    }

    const payload = {
      name: values.name,
      slug: values.slug,
      categoryId: values.categoryId,
      flavor: values.flavor || null,
      description: values.description,
      priceInPaise: Math.round(parseFloat(values.priceInRupees) * 100),
      compareAtPriceInPaise: values.compareAtPriceInRupees ? Math.round(parseFloat(values.compareAtPriceInRupees) * 100) : null,
      weightGrams: values.weightGrams ? parseInt(values.weightGrams, 10) : null,
      proteinGrams: values.proteinGrams ? parseInt(values.proteinGrams, 10) : null,
      images: values.images.split(',').map((s) => s.trim()).filter(Boolean),
      nutrition,
      stock: parseInt(values.stock, 10) || 0,
      isActive: values.isActive,
    };

    setIsSaving(true);
    const res = await fetch(isEdit ? `/api/admin/products/${values.id}` : '/api/admin/products', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setIsSaving(false);

    if (!res.ok) {
      const { error: message } = await res.json();
      setError(message ?? 'Could not save product.');
      return;
    }

    router.push('/admin/products');
    router.refresh();
  };

  return (
    <form className="glass-panel" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <div className="admin-field">
        <label>Name</label>
        <input required value={values.name} onChange={update('name')} />
      </div>
      <div className="admin-field">
        <label>Slug</label>
        <input required value={values.slug} onChange={update('slug')} placeholder="dna-creatine-bar-choco-almond" />
      </div>
      <div className="admin-field">
        <label>Category</label>
        <select required value={values.categoryId} onChange={update('categoryId')}>
          <option value="" disabled>Select a category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="admin-field">
        <label>Flavor</label>
        <input value={values.flavor} onChange={update('flavor')} placeholder="Choco Almond" />
      </div>
      <div className="admin-field">
        <label>Description</label>
        <textarea required rows={3} value={values.description} onChange={update('description')} />
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label>Price (₹)</label>
          <input required type="number" step="0.01" value={values.priceInRupees} onChange={update('priceInRupees')} />
        </div>
        <div className="admin-field">
          <label>Compare-at Price (₹)</label>
          <input type="number" step="0.01" value={values.compareAtPriceInRupees} onChange={update('compareAtPriceInRupees')} />
        </div>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label>Weight (g)</label>
          <input type="number" value={values.weightGrams} onChange={update('weightGrams')} />
        </div>
        <div className="admin-field">
          <label>Protein (g)</label>
          <input type="number" value={values.proteinGrams} onChange={update('proteinGrams')} />
        </div>
      </div>
      <div className="admin-field">
        <label>Images (comma-separated paths)</label>
        <input value={values.images} onChange={update('images')} placeholder="/assets/product1.png" />
      </div>
      <div className="admin-field">
        <label>Nutrition (JSON, optional)</label>
        <textarea rows={2} value={values.nutrition} onChange={update('nutrition')} placeholder='{"energyKcal": 220, "proteinG": 10}' />
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label>Stock</label>
          <input required type="number" value={values.stock} onChange={update('stock')} />
        </div>
        <div className="admin-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.75rem' }}>
          <input type="checkbox" id="isActive" checked={values.isActive} onChange={update('isActive')} style={{ width: 'auto' }} />
          <label htmlFor="isActive" style={{ margin: 0 }}>Active (visible in shop)</label>
        </div>
      </div>

      {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}

      <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isSaving}>
        {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
      </button>
    </form>
  );
}
