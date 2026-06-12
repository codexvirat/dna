'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import './dashboard.css';

// ─── Types ────────────────────────────────────────────────────────────
type FrequencyType = 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
type FlavorType = 'BLUEBERRY_MUFFIN' | 'CHOCO_ALMOND' | 'MIXED';
type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED';

interface Plan {
  id: string;
  name: string;
  frequency: FrequencyType;
  barsPerBox: number;
  priceInPaise: number;
  discountPct: number;
}

interface Subscription {
  id: string;
  plan: Plan;
  flavor: FlavorType;
  quantity: number;
  status: SubscriptionStatus;
  nextDeliveryDate: string;
  startedAt: string;
  address: string | null;
}

// ─── Label maps ───────────────────────────────────────────────────────
const FREQ_LABEL: Record<FrequencyType, string> = {
  WEEKLY:   'Weekly',
  BIWEEKLY: 'Bi-weekly',
  MONTHLY:  'Monthly',
};

const FLAVOR_LABEL: Record<FlavorType, string> = {
  BLUEBERRY_MUFFIN: '🫐 Blueberry Muffin',
  CHOCO_ALMOND:     '🍫 Choco Almond',
  MIXED:            '🎁 Mixed Box',
};

const STATUS_DOT: Record<SubscriptionStatus, string> = {
  ACTIVE:    '🟢',
  PAUSED:    '🟡',
  CANCELLED: '🔴',
};

function formatPrice(paise: number) {
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// ─── Component ────────────────────────────────────────────────────────
export default function DashboardSubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/subscriptions');
      if (res.status === 401) {
        setError('Please log in to view your subscriptions.');
        return;
      }
      const data = await res.json();
      setSubs(data.subscriptions ?? []);
    } catch {
      setError('Failed to load subscriptions. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSubscriptions(); }, [fetchSubscriptions]);

  const handleAction = async (id: string, action: 'pause' | 'resume' | 'cancel') => {
    const confirmMsg = action === 'cancel'
      ? 'Are you sure you want to cancel this subscription? This cannot be undone.'
      : null;
    if (confirmMsg && !window.confirm(confirmMsg)) return;

    setActionLoading(`${id}-${action}`);
    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        setSubs((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...data.subscription } : s))
        );
      } else {
        alert(data.error ?? 'Action failed.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  // ── Stats ──
  const active    = subs.filter((s) => s.status === 'ACTIVE').length;
  const paused    = subs.filter((s) => s.status === 'PAUSED').length;
  const total     = subs.length;

  return (
    <div className="dash-page">
      <div className="dash-container">

        {/* Header */}
        <div className="dash-header">
          <div>
            <h1>My <span className="text-gradient">Subscriptions</span></h1>
            <p>Manage your recurring DNA Bar deliveries</p>
          </div>
          <Link href="/subscription" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
            + Add Plan
          </Link>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <div className="dash-stats">
            <div className="dash-stat">
              <div className="dash-stat__value">{total}</div>
              <div className="dash-stat__label">Total Plans</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat__value" style={{ color: 'var(--accent-cyan)' }}>{active}</div>
              <div className="dash-stat__label">Active</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat__value" style={{ color: '#ffc832' }}>{paused}</div>
              <div className="dash-stat__label">Paused</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat__value">
                {formatPrice(
                  subs
                    .filter((s) => s.status === 'ACTIVE')
                    .reduce((acc, s) => acc + s.plan.priceInPaise * s.quantity, 0)
                )}
              </div>
              <div className="dash-stat__label">Monthly Spend</div>
            </div>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <>
            <div className="dash-skeleton" style={{ height: '120px' }} />
            <div className="dash-skeleton" style={{ height: '120px' }} />
          </>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="dash-empty">
            <div className="dash-empty__icon">⚠️</div>
            <h3>Oops</h3>
            <p>{error}</p>
            {error.includes('log in') ? (
              <Link href="/login?redirect=/dashboard/subscriptions" className="btn-primary">
                Log In
              </Link>
            ) : (
              <button className="btn-primary" onClick={fetchSubscriptions}>Retry</button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && subs.length === 0 && (
          <div className="dash-empty">
            <div className="dash-empty__icon">📦</div>
            <h3>No subscriptions yet</h3>
            <p>Choose a plan and we'll deliver DNA Bars on your schedule — save up to 20%.</p>
            <Link href="/subscription" className="btn-primary">
              Browse Plans
            </Link>
          </div>
        )}

        {/* Subscription cards */}
        {!loading && !error && subs.map((sub) => (
          <div key={sub.id} className={`sub-card ${sub.status.toLowerCase()}`}>
            <div className="sub-card__top">
              <div>
                <div className="sub-card__plan-name">
                  {sub.plan.name} Plan
                </div>
                <div className="sub-card__meta">
                  Started {formatDate(sub.startedAt)}
                </div>
              </div>
              <span className={`sub-status ${sub.status.toLowerCase()}`}>
                {STATUS_DOT[sub.status]} {sub.status}
              </span>
            </div>

            {/* Info pills */}
            <div className="sub-card__pills">
              <span className="sub-pill">
                <span>🔄</span> {FREQ_LABEL[sub.plan.frequency]}
              </span>
              <span className="sub-pill">
                <span>🍫</span> {FLAVOR_LABEL[sub.flavor]}
              </span>
              <span className="sub-pill">
                <span>📦</span> {sub.plan.barsPerBox} bars × {sub.quantity} box{sub.quantity > 1 ? 'es' : ''}
              </span>
              <span className="sub-pill">
                <span>💰</span> {formatPrice(sub.plan.priceInPaise * sub.quantity)}
                <small style={{ marginLeft: 4, color: 'var(--accent-cyan)' }}>
                  ({sub.plan.discountPct}% off)
                </small>
              </span>
            </div>

            {/* Next delivery */}
            {sub.status !== 'CANCELLED' && (
              <div className="sub-card__delivery">
                <span>🚚</span>
                <span>
                  Next delivery:{' '}
                  <strong>{formatDate(sub.nextDeliveryDate)}</strong>
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="sub-card__actions">
              {sub.status === 'ACTIVE' && (
                <button
                  id={`pause-${sub.id}`}
                  className="sub-action-btn"
                  onClick={() => handleAction(sub.id, 'pause')}
                  disabled={actionLoading !== null}
                >
                  {actionLoading === `${sub.id}-pause` ? '…' : '⏸ Pause'}
                </button>
              )}
              {sub.status === 'PAUSED' && (
                <button
                  id={`resume-${sub.id}`}
                  className="sub-action-btn success"
                  onClick={() => handleAction(sub.id, 'resume')}
                  disabled={actionLoading !== null}
                >
                  {actionLoading === `${sub.id}-resume` ? '…' : '▶ Resume'}
                </button>
              )}
              {sub.status !== 'CANCELLED' && (
                <button
                  id={`cancel-${sub.id}`}
                  className="sub-action-btn danger"
                  onClick={() => handleAction(sub.id, 'cancel')}
                  disabled={actionLoading !== null}
                >
                  {actionLoading === `${sub.id}-cancel` ? '…' : '✕ Cancel'}
                </button>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
