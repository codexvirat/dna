import React from 'react';

export default function Contact() {
  return (
    <div className="container section-padding">
      <div className="grid-2">
        <div>
          <h1 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Get in Touch</h1>
          <p style={{ marginBottom: '2rem' }}>
            Have a question about our products, an order, or wholesale inquiries? 
            Fill out the form and our team will get back to you within 24 hours.
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#fff' }}>Email</h4>
            <p>support@dnabars.com</p>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>Address</h4>
            <p>DNA Bars HQ, Aesthetics Street, Fit City, India</p>
          </div>
        </div>
        
        <div className="glass-panel">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Name</label>
              <input type="text" id="name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Email</label>
              <input type="email" id="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} />
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Message</label>
              <textarea id="message" rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
