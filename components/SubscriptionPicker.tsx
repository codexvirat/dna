'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SubscriptionPicker.css';

// ─── Static plan data (matches seeded DB) ────────────────────────────
export const STATIC_PLANS = [
  {
    id: 'starter',
    slug: 'starter',
    name: 'Starter',
    description: 'Perfect intro to the DNA lifestyle. One box every month.',
    frequency: 'MONTHLY' as const,
    frequencyLabel: 'per month',
    barsPerBox: 12,
    price: 999,
    discountPct: 10,
    isPopular: false,
    features: [
      '12 bars per box',
      'Monthly delivery',
      '10% off retail price',
      'Free shipping on orders ₹999+',
      'Cancel anytime',
    ],
  },
  {
    id: 'athlete',
    slug: 'athlete',
    name: 'Athlete',
    description: 'For the serious performer. A fresh box every two weeks.',
    frequency: 'BIWEEKLY' as const,
    frequencyLabel: 'per 2 weeks',
    barsPerBox: 12,
    price: 1799,
    discountPct: 15,
    isPopular: true,
    features: [
      '12 bars per box',
      'Bi-weekly delivery',
      '15% off retail price',
      'Free shipping always',
      'Pause or cancel anytime',
      'Priority customer support',
    ],
  },
  {
    id: 'elite',
    slug: 'elite',
    name: 'Elite',
    description: 'Maximum fuel. Weekly delivery for peak performance.',
    frequency: 'WEEKLY' as const,
    frequencyLabel: 'per week',
    barsPerBox: 12,
    price: 3199,
    discountPct: 20,
    isPopular: false,
    features: [
      '12 bars per box',
      'Weekly delivery',
      '20% off retail price',
      'Free express shipping',
      'Pause or cancel anytime',
      'Dedicated account manager',
      'Early access to new flavors',
    ],
  },
];

type Flavor = 'BLUEBERRY_MUFFIN' | 'CHOCO_ALMOND' | 'MIXED';
const FLAVOR_LABELS: Record<Flavor, string> = {
  BLUEBERRY_MUFFIN: '🫐 Blueberry Muffin',
  CHOCO_ALMOND:     '🍫 Choco Almond',
  MIXED:            '🎁 Mixed Box',
};

export default function SubscriptionPicker() {
  const router = useRouter();
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, Flavor>>({
    starter: 'MIXED',
    athlete: 'MIXED',
    elite:   'MIXED',
  });
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ slug: string; msg: string; ok: boolean } | null>(null);

  const handleSubscribe = async (plan: typeof STATIC_PLANS[0]) => {
    setLoading(plan.slug);
    setFeedback(null);

    // We need the DB plan id — fetch it first
    let planId: string;
    try {
      const res = await fetch('/api/subscription-plans');
      const data = await res.json();
      const found = data.plans?.find((p: { slug: string; id: string }) => p.slug === plan.slug);
      if (!found) throw new Error('Plan not found in database. Please run the seed script.');
      planId = found.id;
    } catch (e: unknown) {
      setFeedback({ slug: plan.slug, msg: e instanceof Error ? e.message : 'Failed to load plan.', ok: false });
      setLoading(null);
      return;
    }

    const res = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, flavor: selectedFlavors[plan.slug] }),
    });

    const data = await res.json();
    setLoading(null);

    if (res.status === 401) {
      // Not logged in — redirect to login
      router.push('/login?redirect=/subscription');
      return;
    }

    if (data.success) {
      setFeedback({ slug: plan.slug, msg: '🎉 Subscribed! Redirecting to your dashboard…', ok: true });
      setTimeout(() => router.push('/dashboard/subscriptions'), 1800);
    } else {
      setFeedback({ slug: plan.slug, msg: data.error ?? 'Something went wrong.', ok: false });
    }
  };

  return (
    <div className="sub-plans__grid">
      {STATIC_PLANS.map((plan, i) => (
        <div
          key={plan.slug}
          className={`plan-card sub-animate ${plan.isPopular ? 'popular' : ''}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {plan.isPopular && (
            <div className="plan-card__popular-badge">⭐ Most Popular</div>
          )}

          <div className="plan-card__name">{plan.name}</div>
          <p className="plan-card__desc">{plan.description}</p>

          <div className="plan-card__price-row">
            <span className="plan-card__price">₹{plan.price.toLocaleString('en-IN')}</span>
            <span className="plan-card__price-period">/ {plan.frequencyLabel}</span>
          </div>
          <span className="plan-card__savings">Save {plan.discountPct}%</span>

          <ul className="plan-card__features">
            {plan.features.map((f) => (
              <li key={f} className="plan-card__feature">
                <span className="plan-card__feature-icon">✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Flavor selector */}
          <label className="plan-card__flavor-label" htmlFor={`flavor-${plan.slug}`}>
            Choose flavor
          </label>
          <select
            id={`flavor-${plan.slug}`}
            className="plan-card__flavor-select"
            value={selectedFlavors[plan.slug]}
            onChange={(e) =>
              setSelectedFlavors((prev) => ({ ...prev, [plan.slug]: e.target.value as Flavor }))
            }
          >
            {(Object.entries(FLAVOR_LABELS) as [Flavor, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          {/* Feedback message */}
          {feedback?.slug === plan.slug && (
            <p style={{
              fontSize: '0.85rem',
              marginBottom: '0.75rem',
              color: feedback.ok ? 'var(--accent-cyan)' : '#ff6b6b',
              textAlign: 'center',
            }}>
              {feedback.msg}
            </p>
          )}

          <button
            id={`subscribe-${plan.slug}`}
            className={`plan-card__cta ${plan.isPopular ? 'primary' : 'outline'}`}
            onClick={() => handleSubscribe(plan)}
            disabled={loading === plan.slug}
          >
            {loading === plan.slug
              ? 'Processing…'
              : `Start ${plan.name} Plan →`}
          </button>
        </div>
      ))}
    </div>
  );
}
