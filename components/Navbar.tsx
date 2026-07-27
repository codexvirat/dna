'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/lib/cart-context';
import './Navbar.css';

const NAV_LINKS = [
  { href: '/brand-story', label: 'Brand Story' },
  { href: '/shop',        label: 'Shop' },
  { href: '/subscription', label: 'Subscribe & Save' },
  { href: '/faq',         label: 'FAQ' },
  { href: '/contact',     label: 'Contact Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, openCart } = useCart();
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <Link href="/" className="logo-wordmark">
            DNA<span className="logo-tm">™</span>
          </Link>
        </div>
        <nav className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? ' nav-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="cart-icon-btn" onClick={openCart} aria-label="Open cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-13z" />
              <path d="M6 6L4 3H2" />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {itemCount > 0 && <span className="cart-icon-badge">{itemCount}</span>}
          </button>
          {status === 'authenticated' ? (
            <>
              <Link
                href={isAdmin ? '/admin' : '/dashboard/subscriptions'}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
              >
                {isAdmin ? 'Admin' : 'Dashboard'}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="nav-link"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : status === 'unauthenticated' ? (
            <Link href="/login" className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
