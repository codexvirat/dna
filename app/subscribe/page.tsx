import React from 'react';
import type { Metadata } from 'next';
import SubscribeForm from '@/components/SubscribeForm';
import './subscribe.css';

export const metadata: Metadata = {
  title: 'Subscribe | DNA Bars - Exclusive Drops & Training Tips',
  description: 'Join the DNA movement. Get exclusive product drops, early access, and pro training tips delivered to your inbox.',
};

const PERKS = [
  { icon: '⚡', text: 'Early access to new flavors' },
  { icon: '🎁', text: 'Exclusive subscriber discounts' },
  { icon: '🏋️', text: 'Pro training tips & protocols' },
  { icon: '🚀', text: 'First to know about drops' },
];

const BENEFITS = [
  {
    icon: '🔥',
    title: 'Exclusive Drops',
    description: 'Be the first to grab limited-edition flavors before they sell out.',
  },
  {
    icon: '💪',
    title: 'Training Tips',
    description: 'Science-backed nutrition and training protocols from top athletes.',
  },
  {
    icon: '💰',
    title: 'Member Discounts',
    description: 'Unlock subscriber-only deals and bundle offers every month.',
  },
  {
    icon: '🧬',
    title: 'Formulation Insights',
    description: 'Behind-the-scenes looks at how we craft the triple-threat formula.',
  },
];

export default function SubscribePage() {
  return (
    <div className="subscribe-page">
      {/* Hero */}
      <section className="subscribe-hero-section">
        <div className="subscribe-badge">
          <span className="subscribe-badge__dot" />
          Join 2,400+ athletes already subscribed
        </div>

        <h1 className="subscribe-hero-title">
          Fuel Your Feed with{' '}
          <span className="text-gradient">Pure Aesthetics</span>
        </h1>

        <p className="subscribe-hero-subtitle">
          Subscribe to the DNA newsletter and get exclusive drops, early access to new flavors, and
          science-backed training tips straight to your inbox. No spam. Just gains.
        </p>

        {/* Main Card */}
        <div className="subscribe-card">
          {/* Perks */}
          <div className="subscribe-perks">
            {PERKS.map((perk) => (
              <div key={perk.text} className="subscribe-perk">
                <span className="subscribe-perk__icon">{perk.icon}</span>
                <span>{perk.text}</span>
              </div>
            ))}
          </div>

          <div className="subscribe-divider">Join the movement</div>

          {/* Functional Form */}
          <SubscribeForm variant="hero" />

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>

        {/* Social Proof */}
        <div className="subscribe-social-proof">
          <div className="subscribe-avatars">
            {['💪', '🏋️', '⚡', '🔥', '🧬'].map((emoji, i) => (
              <div key={i} className="subscribe-avatar">{emoji}</div>
            ))}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Trusted by <strong style={{ color: '#fff' }}>2,400+</strong> performance athletes worldwide
          </p>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="subscribe-benefits">
        <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
          What You Get As a Subscriber
        </h2>
        <div className="subscribe-benefits__grid">
          {BENEFITS.map((b) => (
            <div key={b.title} className="subscribe-benefit-card">
              <div className="subscribe-benefit-card__icon">{b.icon}</div>
              <h3 className="text-gradient">{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
