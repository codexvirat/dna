'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './subscription.css';

import SubscriptionPicker from '../../components/SubscriptionPicker';

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — cancel, pause, or modify your subscription anytime from your dashboard. No lock-in periods.',
  },
  {
    q: 'When will my first box arrive?',
    a: 'Your first delivery ships within 3–5 business days of subscribing. After that, boxes arrive on your chosen schedule.',
  },
  {
    q: 'Can I change my flavor?',
    a: 'Absolutely. Log into your dashboard and update your flavor preference before the next billing cycle.',
  },
  {
    q: 'Is there a commitment period?',
    a: 'None at all. Subscribe month-to-month and leave whenever you want.',
  },
];

export default function SubscriptionPage() {

  return (
    <div className="sub-page">
      {/* ── Hero ── */}
      <section className="sub-hero sub-animate">
        <span className="sub-eyebrow">✦ Subscribe &amp; Save</span>
        <h1>
          Never Run Out of <span className="text-gradient">Fuel</span>
        </h1>
        <p>
          Pick your plan, choose your flavor, and we'll deliver DNA Bars on your schedule.
          Save up to <strong style={{ color: '#fff' }}>20%</strong> vs. single orders.
        </p>
      </section>

      {/* ── Plan Cards ── */}
      <section className="sub-plans">
        <SubscriptionPicker />
      </section>

      {/* ── FAQ ── */}
      <section className="sub-faq">
        <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
        {FAQS.map((item) => (
          <div key={item.q} className="sub-faq__item">
            <p className="sub-faq__q">{item.q}</p>
            <p className="sub-faq__a">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
