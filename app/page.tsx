'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubscriptionPicker from '../components/SubscriptionPicker';
import './home.css';

/* ── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Ticker content ──────────────────────────────────────────── */
const TICKER_ITEMS = [
  '🧬 Science-Backed Nutrition',
  '⚡ Peak Performance',
  '💪 Muscle Recovery',
  '✨ Aesthetic Wellness',
  '🔬 Clinically Dosed',
  '🏆 Elite Ingredients',
  '🌿 Clean Label',
  '🚀 Next-Gen Protein',
];

/* ── Products ────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'anabolic',
    tag: 'Strength & Muscle',
    name: 'DNA Anabolic Bar',
    desc: 'Creatine + Glutamine + Elite Protein. Built for performance, recovery, and muscle growth.',
    img: '/assets/product2.png',
    accentColor: 'rgba(0,243,255,0.12)',
  },
  {
    id: 'collagen',
    tag: 'Glow & Recovery',
    name: 'Collagen Glow Bar',
    desc: 'Ashwagandha + Collagen Builders + Elite Protein. Radiant skin, joint recovery, inner wellness.',
    img: '/assets/product1.png',
    accentColor: 'rgba(176,38,255,0.1)',
  },
];

/* ── Pillars ─────────────────────────────────────────────────── */
const PILLARS = [
  { num: '01', title: 'Performance', text: 'Clinically dosed creatine and protein to maximize your output every session.' },
  { num: '02', title: 'Recovery', text: 'Glutamine and adaptogens that accelerate muscle repair and reduce soreness.' },
  { num: '03', title: 'Wellness', text: 'Ashwagandha reduces cortisol so your body operates at its biological best.' },
  { num: '04', title: 'Aesthetics', text: 'Collagen builders and clean macros that support the physique you\'re building.' },
];

/* ── Ingredients ─────────────────────────────────────────────── */
const INGREDIENTS = [
  { emoji: '⚡', name: 'Creatine', desc: 'Explosive strength and power output. The most studied performance compound.' },
  { emoji: '🔄', name: 'Glutamine', desc: 'Accelerated muscle repair, gut health, and immune function.' },
  { emoji: '🌿', name: 'Ashwagandha', desc: 'Adaptogen that lowers cortisol and supports hormonal balance.' },
  { emoji: '💎', name: 'Elite Protein', desc: '10g premium protein per bar with a complete amino acid profile.' },
  { emoji: '✨', name: 'Collagen Builders', desc: 'Skin elasticity, joint recovery, and connective tissue strength.' },
];

// Removed static PLANS array since we are using SubscriptionPicker

/* ── Testimonials ────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'The Anabolic Bar is the only protein bar I\'ve tried where the ingredients actually match the science. My recovery has never been this fast.',
    name: 'Arjun S.',
    role: 'Competitive Powerlifter',
    avatar: '🏋️',
    stars: 5,
  },
  {
    quote: 'As a nutritionist, I\'m picky about labels. DNA Bars is the real deal — clean, clinically dosed, and the taste is genuinely incredible.',
    name: 'Dr. Priya M.',
    role: 'Sports Nutritionist',
    avatar: '🧬',
    stars: 5,
  },
  {
    quote: 'The Collagen Glow Bar changed my skin and my joints. Six weeks in and my coach noticed the difference before I even mentioned it.',
    name: 'Meera T.',
    role: 'Crossfit Athlete',
    avatar: '⚡',
    stars: 5,
  },
];

/* ── Experience tiles ────────────────────────────────────────── */
const EXPERIENCES = [
  { label: 'Training', title: 'Peak Performance', emoji: '🏋️' },
  { label: 'Recovery', title: 'Deep Repair', emoji: '🔄' },
  { label: 'Wellness', title: 'Daily Ritual', emoji: '🌿' },
];

export default function Home() {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="home-page">

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="hero dna-section">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay loop muted playsInline
          aria-hidden="true"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" />

        <div className="hero__content">
          <span className="hero__eyebrow">DNA Bars — Daily Nutrition Aesthetics</span>
          <h1 className="hero__title">
            YOUR AESTHETIC<br />
            <span className="text-gradient">BLUEPRINT</span><br />
            IN A WRAPPER
          </h1>
          <p className="hero__subtitle">
            Science-backed. Flavor-first. Built for athletes who refuse to compromise.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn-primary">Shop Now</Link>
            <Link href="/subscription" className="btn-secondary">Subscribe &amp; Save</Link>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`ticker__item${i % 4 === 0 ? ' ticker__item--accent' : ''}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ 2. FEATURED PRODUCTS ══════════════════════════════════ */}
      <section className="products dna-section">
        <div className="products__header reveal">
          <span className="section-eyebrow">Our Products</span>
          <h2 className="section-title">Two bars.<br />Infinite potential.</h2>
          <p className="section-sub">Each formula engineered for a specific goal. No fillers. No compromise.</p>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="product-feature reveal"
              style={{
                background: `radial-gradient(ellipse at ${i === 0 ? '70% 30%' : '30% 30%'}, ${p.accentColor} 0%, #0d0d14 60%)`,
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width:900px) 100vw, 50vw"
                className="product-feature__img"
                style={{ objectFit: 'contain', objectPosition: 'center 28%', padding: '3rem', position: 'absolute' }}
              />
              <div className="product-feature__body">
                <span className="product-feature__tag">{p.tag}</span>
                <h3 className="product-feature__name">{p.name}</h3>
                <p className="product-feature__desc">{p.desc}</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Link href="/shop" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                    Buy Now
                  </Link>
                  <Link href="/subscription" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. WHY DNA ════════════════════════════════════════════ */}
      <section className="why dna-section">
        <div className="why__inner">
          <h2 className="why__lead reveal">
            Engineered for the<br />
            <span className="text-gradient">athlete in you.</span>
          </h2>
          <div className="why__pillars">
            {PILLARS.map((p, i) => (
              <div key={p.num} className={`why__pillar reveal reveal-d${i + 1}`}>
                <span className="why__pillar-num">{p.num}</span>
                <div className="why__pillar-title">{p.title}</div>
                <p className="why__pillar-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SCIENCE ════════════════════════════════════════════ */}
      <section className="science dna-section">
        <div className="science__inner">
          <div className="science__text">
            <span className="section-eyebrow reveal">The Science</span>
            <h2 className="science__headline reveal reveal-d1">
              Every ingredient<br />earns its place.
            </h2>
            <p className="science__body reveal reveal-d2">
              We don\'t follow trends. We follow the research. Every compound in DNA Bars is
              chosen based on peer-reviewed evidence, clinically effective doses, and
              compatibility with your body's biology.
            </p>
            <div className="science__stats reveal reveal-d3">
              <div>
                <div className="science__stat-val">10g</div>
                <div className="science__stat-label">Protein Per Bar</div>
              </div>
              <div>
                <div className="science__stat-val">3-in-1</div>
                <div className="science__stat-label">Triple Threat Formula</div>
              </div>
              <div>
                <div className="science__stat-val">Zero</div>
                <div className="science__stat-label">Artificial Fillers</div>
              </div>
            </div>
          </div>

          <div className="science__visual reveal reveal-d2">
            <div className="science__product-wrap">
              <div className="science__glow" />
              <Image
                src="/assets/product1.png"
                alt="DNA Bars science"
                width={480}
                height={480}
                className="science__product-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. INGREDIENTS ════════════════════════════════════════ */}
      <section className="ingredients dna-section">
        <div className="ingredients__header">
          <span className="section-eyebrow reveal">Ingredients</span>
          <h2 className="section-title reveal reveal-d1">Built from the best.</h2>
          <p className="section-sub reveal reveal-d2">Five power compounds. One perfect bar.</p>
        </div>
        <div className="ingredients__grid">
          {INGREDIENTS.map((ingr, i) => (
            <div key={ingr.name} className={`ingr-card reveal reveal-d${Math.min(i + 1, 5)}`}>
              <span className="ingr-card__emoji">{ingr.emoji}</span>
              <div className="ingr-card__name">{ingr.name}</div>
              <p className="ingr-card__desc">{ingr.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 6. SUBSCRIPTION PLANS ════════════════════════════════ */}
      <section className="sub-plans-section dna-section">
        <div className="sub-plans-section__header">
          <span className="section-eyebrow reveal">Subscribe &amp; Save</span>
          <h2 className="section-title reveal reveal-d1">Never run out<br />of fuel.</h2>
          <p className="section-sub reveal reveal-d2">
            Save up to 25% with a subscription. Pause or cancel anytime — no lock-in.
          </p>
        </div>
        <div className="sub-plans-section__cards" style={{ display: 'flex', justifyContent: 'center' }}>
          <SubscriptionPicker />
        </div>
      </section>

      {/* ══ 7. SOCIAL PROOF ══════════════════════════════════════ */}
      <section className="proof dna-section">
        <div className="proof__inner">
          <h2 className="proof__tagline reveal">
            Trusted by athletes<br />
            who demand<br />
            <span className="text-gradient">more.</span>
          </h2>
          <div className="proof__stats">
            {[
              { val: '2,400+', label: 'Athletes subscribed' },
              { val: '98%', label: 'Would recommend' },
              { val: '4.9★', label: 'Average rating' },
              { val: '0', label: 'Artificial fillers' },
            ].map((s, i) => (
              <div key={s.val} className={`reveal reveal-d${i + 1}`}>
                <div className="proof__stat-val">{s.val}</div>
                <div className="proof__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS ══════════════════════════════════════ */}
      <section className="testi dna-section">
        <div className="testi__header">
          <span className="section-eyebrow reveal">Reviews</span>
          <h2 className="section-title reveal reveal-d1">Real athletes.<br />Real results.</h2>
        </div>
        <div className="testi__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testi-card reveal reveal-d${i + 1}`}>
              <div className="testi-card__stars">{'★'.repeat(t.stars)}</div>
              <p className="testi-card__quote">"{t.quote}"</p>
              <div className="testi-card__author">
                <div className="testi-card__avatar">{t.avatar}</div>
                <div>
                  <div className="testi-card__name">{t.name}</div>
                  <div className="testi-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 9. DNA EXPERIENCE ════════════════════════════════════ */}
      <section className="experience dna-section">
        <div className="experience__header">
          <span className="section-eyebrow reveal">The DNA Experience</span>
          <h2 className="section-title reveal reveal-d1">A bar for every<br />chapter of your day.</h2>
        </div>
        <div className="experience__grid">
          {EXPERIENCES.map((e, i) => (
            <div key={e.title} className={`exp-tile reveal reveal-d${i + 1}`}>
              <div className="exp-tile__bg">{e.emoji}</div>
              <div className="exp-tile__body">
                <span className="exp-tile__label">{e.label}</span>
                <h3 className="exp-tile__title">{e.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 10. FINAL CTA ════════════════════════════════════════ */}
      <section className="final-cta dna-section">
        <span className="final-cta__eyebrow reveal">Start Today</span>
        <h2 className="final-cta__headline reveal reveal-d1">
          Your body deserves<br />
          <span className="text-gradient">the best.</span>
        </h2>
        <p className="final-cta__sub reveal reveal-d2">
          Join 2,400+ athletes fuelling their aesthetic with DNA Bars. First order ships in 24 hours.
        </p>
        <div className="final-cta__actions reveal reveal-d3">
          <Link href="/shop" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Shop DNA Bars
          </Link>
          <Link href="/subscription" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Subscribe &amp; Save 25%
          </Link>
        </div>
      </section>

    </div>
  );
}
