import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import './admin.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard/subscriptions');
  }

  return (
    <div className="container section-padding">
      <div className="admin-shell">
        <aside className="admin-sidebar glass-panel">
          <h3 className="text-gradient">Admin</h3>
          <nav>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/categories">Categories</Link>
          </nav>
        </aside>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
