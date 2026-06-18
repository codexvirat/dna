'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        <div className="nav-actions">
          <Link href="/dashboard/subscriptions" className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
