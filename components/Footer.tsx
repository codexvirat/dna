import React from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', marginTop: '4rem', padding: '4rem 2rem 2rem' }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div>
            <h3 className="text-gradient" style={{ marginBottom: '1rem' }}>DNA BARS</h3>
            <p>Daily Nutrition Aesthetics. Fuel your body with the ultimate triple threat formula for peak performance and recovery.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/shop">Shop All</Link></li>
              <li><Link href="/brand-story">Our Story</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Stay Updated</h4>
            <p>Join the aesthetic movement. Get exclusive drops and training tips.</p>
            <SubscribeForm variant="footer" />
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} DNA Bars. All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

