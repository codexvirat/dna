import React from 'react';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
  return (
    <main className="container section-padding">
      {/* Hero Section */}
      <section className="text-center" style={{ marginBottom: '4rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '100px', background: 'var(--accent-cyan-glow)', filter: 'blur(100px)', zIndex: -1 }}></div>
        <h1 className="text-gradient animate-float" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1rem' }}>
          Shop DNA Bars
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Elevate your performance with our premium, scientifically formulated protein bars. The ultimate triple-threat formula.
        </p>
      </section>

      {/* Trust & Benefit Bar */}
      <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', background: 'rgba(0, 243, 255, 0.03)', border: '1px solid rgba(0, 243, 255, 0.1)' }}>
        {[
          { icon: "⚡", text: "Premium Ingredients" },
          { icon: "🚀", text: "Free Shipping Over $50" },
          { icon: "🔒", text: "Secure Checkout" },
          { icon: "💪", text: "Formulated for Aesthetics" }
        ].map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.5))' }}>{item.icon}</span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>{item.text}</span>
          </div>
        ))}
      </section>

      {/* Category Filters */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {["All Products", "Best Sellers", "High Protein", "Recovery"].map((category, index) => (
          <button 
            key={index} 
            className="btn-secondary" 
            style={{ 
              padding: '0.6rem 2rem', 
              fontSize: '0.95rem', 
              borderRadius: '30px',
              borderColor: index === 0 ? 'var(--accent-cyan)' : 'var(--glass-border)',
              color: index === 0 ? 'var(--accent-cyan)' : 'var(--text-primary)',
              background: index === 0 ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="grid-2" style={{ position: 'relative' }}>
        {/* Subtle background glow for the grid */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '400px', height: '400px', background: 'var(--accent-purple-glow)', filter: 'blur(150px)', zIndex: -1, opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'var(--accent-cyan-glow)', filter: 'blur(150px)', zIndex: -1, opacity: 0.4 }}></div>

        <ProductCard 
          id="collagen-glow-bar"
          name="Collagen Glow Bar"
          flavor="Glow & Wellness"
          protein="10g"
          benefits="Protein + Collagen Builders + Glutamine. Radiant skin, recovery, and inner wellness."
          imageSrc="/assets/product1.png"
        />
        <ProductCard 
          id="dna-anabolic-bar"
          name="DNA Anabolic Bar"
          flavor="Strength & Recovery"
          protein="10g"
          benefits="Protein + Creatine + Ashwagandha. Built for daily performance and recovery."
          imageSrc="/assets/product2.png"
        />
      </section>
    </main>
  );
}
