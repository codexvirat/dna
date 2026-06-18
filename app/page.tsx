'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SubscriptionPicker from '../components/SubscriptionPicker';
import './home.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  '🧬 Research-Backed Nutrition',
  '⚡ Everyday Energy',
  '💪 Daily Recovery',
  '✨ Wellness Essentials',
  '🔬 Clinically Dosed',
  '🏆 Premium Ingredients',
  '🌿 Clean Label',
  '🚀 Modern Nutrition',
];

/* ── Products ────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'anabolic',
    tag: 'Strength & Recovery',
    name: 'DNA Anabolic Bar',
    desc: 'Protein + Creatine + Ashwagandha. Built for daily performance and recovery.',
    img: '/assets/product2.png',
    accentColor: 'rgba(0,243,255,0.12)',
  },
  {
    id: 'collagen',
    tag: 'Glow & Wellness',
    name: 'Collagen Glow Bar',
    desc: 'Protein + Collagen Builders + Glutamine. Radiant skin, recovery, and inner wellness.',
    img: '/assets/product1.png',
    accentColor: 'rgba(176,38,255,0.1)',
  },
];

/* ── Pillars ─────────────────────────────────────────────────── */
const PILLARS = [
  { num: '01', title: 'Performance', text: 'Support energy, strength, and daily activity.' },
  { num: '02', title: 'Recovery', text: 'Help the body recover and maintain overall wellness.' },
  { num: '03', title: 'Wellness', text: 'Support stress management and daily balance.' },
  { num: '04', title: 'Nutrition', text: 'Provide convenient, high-quality nutrition for everyday life.' },
];

/* ── Audience ────────────────────────────────────────────────── */
const AUDIENCE = [
  { emoji: '🎓', label: 'Students' },
  { emoji: '💼', label: 'Working Professionals' },
  { emoji: '💪', label: 'Fitness Enthusiasts' },
  { emoji: '🏠', label: 'Homemakers' },
  { emoji: '🏃', label: 'Active Adults' },
  { emoji: '🧓', label: 'Senior Citizens' },
  { emoji: '✨', label: 'Everyone' },
];

/* ── Ingredients ─────────────────────────────────────────────── */
const INGREDIENTS = [
  { emoji: '⚡', name: 'Creatine', desc: 'Supports strength, energy, and physical performance.' },
  { emoji: '🔄', name: 'Glutamine', desc: 'Supports recovery, digestion, and immune health.' },
  { emoji: '🌿', name: 'Ashwagandha', desc: 'Supports stress management and overall wellbeing.' },
  { emoji: '💎', name: 'Elite Protein', desc: 'Provides 10g premium protein with a complete amino acid profile.' },
  { emoji: '✨', name: 'Collagen Builders', desc: 'Supports skin, joints, and connective tissue health.' },
];

/* ── Testimonials ────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'The Anabolic Bar is the only protein bar I\'ve tried where the ingredients actually match the science. My energy levels have never been better.',
    name: 'Arjun S.',
    role: 'Fitness Enthusiast',
    avatar: '🏋️',
    stars: 5,
  },
  {
    quote: 'As a nutritionist, I\'m picky about labels. DNA Bars is the real deal — clean, clinically dosed, and the taste is genuinely incredible.',
    name: 'Dr. Priya M.',
    role: 'Nutritionist',
    avatar: '🧬',
    stars: 5,
  },
  {
    quote: 'The Collagen Glow Bar changed my skin and my joints. Six weeks in and my friends noticed the difference before I even mentioned it.',
    name: 'Meera T.',
    role: 'Wellness Advocate',
    avatar: '⚡',
    stars: 5,
  },
];

/* ── Experience tiles ────────────────────────────────────────── */
const EXPERIENCES = [
  { label: 'Daily Energy', title: 'Active Living', emoji: '☀️' },
  { label: 'Recovery', title: 'Rest & Recover', emoji: '🔄' },
  { label: 'Wellness', title: 'Daily Balance', emoji: '🌿' },
];

export default function Home() {
  useReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. PRELOADER ANIMATION
    const tl = gsap.timeline();
    
    tl.to('.preloader__char', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.3,
      ease: "power2.out",
    })
    .to('.preloader__text', {
      opacity: 0,
      duration: 0.5,
      delay: 0.4,
      ease: "power2.inOut"
    })
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
      }
    });
  }, { scope: preloaderRef });

  useGSAP(() => {
    // 2. HERO HORIZONTAL SCROLL ANIMATION
    const panels = gsap.utils.toArray('.hero__panel');
    const dots = gsap.utils.toArray('.hero__dot');
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.3, max: 0.6 },
          delay: 0, 
          ease: "power2.inOut"
        },
        end: "+=2000", // Adjusted scroll distance
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate active index based on progress (0 to 1)
          const activeIndex = Math.min(
            panels.length - 1,
            Math.floor(progress * panels.length)
          );
          
          dots.forEach((dot, index) => {
            if (index === activeIndex) {
              (dot as HTMLElement).classList.add('active');
            } else {
              (dot as HTMLElement).classList.remove('active');
            }
          });
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div className="home-page">

      {/* ══ PRELOADER ══════════════════════════════════════════════════════ */}
      <div className="preloader" ref={preloaderRef}>
        <div className="preloader__text">
          <span className="preloader__char">D</span>
          <span className="preloader__char">N</span>
          <span className="preloader__char">A</span>
        </div>
      </div>

      {/* ══ 1. HERO — HORIZONTAL VIDEO SEQUENCE ═══════════════════════════════════ */}
      <section className="hero-container dna-section" ref={containerRef}>
        <div className="hero__track">
          <div className="hero__panel">
            <video className="hero__video" autoPlay loop muted playsInline aria-hidden="true">
              <source src="/assets/videos/dna-logo.mp4" type="video/mp4" />
            </video>
            <div className="hero__fade" />
          </div>
          <div className="hero__panel">
            <video className="hero__video" autoPlay loop muted playsInline aria-hidden="true">
              <source src="/assets/videos/product-video-1.mp4" type="video/mp4" />
            </video>
            <div className="hero__fade" />
          </div>
          <div className="hero__panel">
            <video className="hero__video" autoPlay loop muted playsInline aria-hidden="true">
              <source src="/assets/videos/product-video-2.mp4" type="video/mp4" />
            </video>
            <div className="hero__fade" />
          </div>
          <div className="hero__panel">
            <video className="hero__video" autoPlay loop muted playsInline aria-hidden="true">
              <source src="/assets/videos/video_4.mp4" type="video/mp4" />
            </video>
            <div className="hero__fade" />
          </div>
        </div>

        {/* Premium Progress Indicators */}
        <div className="hero__progress">
          <div className="hero__dot active"></div>
          <div className="hero__dot"></div>
          <div className="hero__dot"></div>
          <div className="hero__dot"></div>
        </div>
      </section>

      {/* ══ HERO CONTENT — Below video ═════════════════════════════ */}
      <section className="hero-intro dna-section">
        <div className="hero-intro__inner">
          <span className="hero-intro__eyebrow">DNA Bars — Everyday Nutrition</span>
          <h1 className="hero-intro__title">
            TO SERVE A<br />
            <span className="text-gradient">BILLION LIVES</span>
          </h1>
          <p className="hero-intro__subtitle">
            Research-backed ingredients. Convenient daily nutrition.<br />
            Built for everyone who values wellness.
          </p>
          <div className="hero-intro__actions">
            <Link href="/shop" className="btn-primary">Shop Now</Link>
            <Link href="/subscription" className="btn-secondary">Subscribe &amp; Save</Link>
          </div>
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
          <p className="section-sub">Each formula crafted for a specific goal. No fillers. No compromise.</p>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="product-feature reveal"
              style={{
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width:900px) 100vw, 50vw"
                className="product-feature__img"
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

      {/* ══ 3. BUILT FOR EVERYDAY NUTRITION — Unified Section ═════ */}
      <section className="nourish dna-section">
        <div className="nourish__container">

          {/* ── Eyebrow + headline ─────────────────────────────── */}
          <span className="section-eyebrow reveal">Why DNA Bars</span>
          <h2 className="nourish__headline reveal reveal-d1">
            Built for <span className="text-gradient">Everyday Nutrition.</span>
          </h2>
          <p className="nourish__lead reveal reveal-d2">
            Research-backed ingredients. Convenient daily nutrition.
            Designed for everyone who values wellness — not just athletes.
          </p>

          {/* ── Stats bar ──────────────────────────────────────── */}
          <div className="nourish__stats reveal reveal-d3">
            <div className="nourish__stat">
              <div className="nourish__stat-val">10g</div>
              <div className="nourish__stat-label">Protein Per Bar</div>
            </div>
            <div className="nourish__stat-divider" />
            <div className="nourish__stat">
              <div className="nourish__stat-val">3‑in‑1</div>
              <div className="nourish__stat-label">Functional Formula</div>
            </div>
            <div className="nourish__stat-divider" />
            <div className="nourish__stat">
              <div className="nourish__stat-val">Zero</div>
              <div className="nourish__stat-label">Artificial Fillers</div>
            </div>
          </div>

          {/* ── Two-column: Pillars + Ingredients ──────────────── */}
          <div className="nourish__grid">

            {/* Left — Benefits */}
            <div className="nourish__benefits">
              <h3 className="nourish__col-title reveal">What We Deliver</h3>
              <div className="nourish__pillar-list">
                {PILLARS.map((p, i) => (
                  <div key={p.num} className={`nourish__pillar reveal reveal-d${i + 1}`}>
                    <span className="nourish__pillar-num">{p.num}</span>
                    <div>
                      <div className="nourish__pillar-name">{p.title}</div>
                      <p className="nourish__pillar-desc">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Ingredients */}
            <div className="nourish__ingredients">
              <h3 className="nourish__col-title reveal">What&apos;s Inside</h3>
              <div className="nourish__ingr-list">
                {INGREDIENTS.map((ingr, i) => (
                  <div key={ingr.name} className={`nourish__ingr reveal reveal-d${i + 1}`}>
                    <span className="nourish__ingr-icon">{ingr.emoji}</span>
                    <div>
                      <div className="nourish__ingr-name">{ingr.name}</div>
                      <p className="nourish__ingr-desc">{ingr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Audience strip ─────────────────────────────────── */}
          <div className="nourish__audience reveal">
            <span className="nourish__audience-label">Made for</span>
            <div className="nourish__audience-tags">
              {AUDIENCE.map((a) => (
                <span key={a.label} className="nourish__tag">{a.emoji} {a.label}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══ 4. SUBSCRIPTION PLANS ════════════════════════════════ */}
      <section className="sub-plans-section dna-section">
        <div className="sub-plans-section__header">
          <span className="section-eyebrow reveal">Subscribe &amp; Save</span>
          <h2 className="section-title reveal reveal-d1">Never run out<br />of nutrition.</h2>
          <p className="section-sub reveal reveal-d2">
            Save up to 15% with a subscription. Pause or cancel anytime — no lock-in.
          </p>
        </div>
        <div className="sub-plans-section__cards" style={{ display: 'flex', justifyContent: 'center' }}>
          <SubscriptionPicker />
        </div>
      </section>

      {/* ══ 5. SOCIAL PROOF ══════════════════════════════════════ */}
      <section className="proof dna-section">
        <div className="proof__inner">
          <h2 className="proof__tagline reveal">
            Trusted by people<br />
            who demand<br />
            <span className="text-gradient">more.</span>
          </h2>
          <div className="proof__stats">
            {[
              { val: '2,400+', label: 'Customers subscribed' },
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

      {/* ══ 6. TESTIMONIALS ══════════════════════════════════════ */}
      <section className="testi dna-section">
        <div className="testi__header">
          <span className="section-eyebrow reveal">Reviews</span>
          <h2 className="section-title reveal reveal-d1">Real people.<br />Real results.</h2>
        </div>
        <div className="testi__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testi-card reveal reveal-d${i + 1}`}>
              <div className="testi-card__stars">{'★'.repeat(t.stars)}</div>
              <p className="testi-card__quote">&quot;{t.quote}&quot;</p>
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

      {/* ══ 7. DNA EXPERIENCE ════════════════════════════════════ */}
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

      {/* ══ 8. FINAL CTA ════════════════════════════════════════ */}
      <section className="final-cta dna-section">
        <span className="final-cta__eyebrow reveal">Start Today</span>
        <h2 className="final-cta__headline reveal reveal-d1">
          Your body deserves<br />
          <span className="text-gradient">the best.</span>
        </h2>
        <p className="final-cta__sub reveal reveal-d2">
          Join 2,400+ people nourishing their everyday wellness with DNA Bars. First order ships in 24 hours.
        </p>
        <div className="final-cta__actions reveal reveal-d3">
          <Link href="/shop" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Shop DNA Bars
          </Link>
          <Link href="/subscription" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Subscribe &amp; Save 15%
          </Link>
        </div>
      </section>

    </div>
  );
}
