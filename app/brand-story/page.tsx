import React from 'react';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <main className="container section-padding">
      {/* Header Section */}
      <section className="text-center" style={{ marginBottom: '6rem' }}>
        <h1 className="text-gradient animate-float" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', marginBottom: '1.5rem' }}>
          Daily Nutrition Aesthetics
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          We don't just fuel workouts; we fuel lifestyles. DNA Bars represents the pinnacle of performance nutrition, engineered for those who refuse to compromise on taste or aesthetics.
        </p>
      </section>

      {/* The Founder's Message */}
      <section className="grid-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
        <div className="glass-panel animate-glow" style={{ padding: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '4rem', color: 'var(--accent-cyan)', opacity: 0.3, fontFamily: 'serif' }}>
            "
          </div>
          <h2 className="text-gradient" style={{ marginBottom: '2rem' }}>The Founder's Vision</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            "I was exhausted by the supplement industry's false promises. As an athlete, I was constantly forced to choose between protein bars that tasted like absolute chalk or candy bars masquerading as health food."
          </p>
          <p style={{ fontSize: '1.15rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            "I knew there had to be a way to create a product that looked incredible, tasted like a cheat meal, and delivered elite-level nutrition. That obsession led to the creation of DNA Bars—a true triple-threat formula."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-brand)', padding: '2px' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                 JD
               </div>
            </div>
            <div>
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>John Doe</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>Founder & CEO</p>
            </div>
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', height: '500px', borderRadius: '24px', background: 'linear-gradient(45deg, var(--bg-secondary), var(--bg-primary))', border: '1px solid var(--glass-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {/* Placeholder for founder image/graphic */}
             <div style={{ textAlign: 'center', opacity: 0.5 }}>
               <div style={{ width: '100px', height: '100px', border: '2px solid var(--accent-purple)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ fontSize: '2rem', color: 'var(--accent-purple)' }}>✧</span>
               </div>
               <p>Visionary Aesthetics</p>
             </div>
          </div>
          {/* Decorative Elements */}
          <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '150px', height: '150px', background: 'var(--accent-cyan-glow)', filter: 'blur(80px)', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '150px', height: '150px', background: 'var(--accent-purple-glow)', filter: 'blur(80px)', zIndex: -1 }}></div>
        </div>
      </section>

      {/* How It Was Built */}
      <section style={{ marginBottom: '6rem' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="text-gradient">How It Was Built</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            We didn't just mix ingredients; we engineered a formula. Here's what makes DNA Bars the ultimate performance fuel.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '2rem' }}>
          {[
            {
              title: "Whey Protein Isolate",
              desc: "Pure, fast-absorbing protein to trigger muscle protein synthesis instantly.",
              color: "var(--accent-cyan)"
            },
            {
              title: "Ashwagandha Extract",
              desc: "Premium adaptogens to lower cortisol, reduce stress, and enhance recovery.",
              color: "var(--accent-purple)"
            },
            {
              title: "Creatine & Collagen",
              desc: "The ultimate duo for explosive power output and joint health aesthetics.",
              color: "#ff2a5f"
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: item.color }}></div>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: `rgba(${item.color === 'var(--accent-cyan)' ? '0,243,255' : item.color === 'var(--accent-purple)' ? '176,38,255' : '255,42,95'}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: `1px solid rgba(${item.color === 'var(--accent-cyan)' ? '0,243,255' : item.color === 'var(--accent-purple)' ? '176,38,255' : '255,42,95'}, 0.3)` }}>
                <span style={{ color: item.color, fontSize: '1.5rem', fontWeight: 'bold' }}>0{i + 1}</span>
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center glass-panel animate-glow" style={{ padding: '4rem 2rem', background: 'linear-gradient(to right, rgba(0,243,255,0.05), rgba(176,38,255,0.05))' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Ready to Experience the Difference?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Join thousands of athletes who have already upgraded their nutrition aesthetics.
        </p>
        <Link href="/shop" className="btn-primary">
          Shop DNA Bars
        </Link>
      </section>
    </main>
  );
}
