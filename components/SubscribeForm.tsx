'use client';

import React, { useState } from 'react';
import './subscribe-form.css';

interface SubscribeFormProps {
  variant?: 'footer' | 'inline' | 'hero';
}

export default function SubscribeForm({ variant = 'inline' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (variant === 'footer') {
    return (
      <div className="subscribe-footer">
        <form onSubmit={handleSubmit} className="subscribe-footer__form">
          <input
            id="footer-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="subscribe-footer__input"
            disabled={status === 'loading' || status === 'success'}
            required
          />
          <button
            id="footer-subscribe-btn"
            type="submit"
            className={`btn-primary subscribe-footer__btn ${status === 'loading' ? 'loading' : ''}`}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <span className="spinner" />
            ) : status === 'success' ? (
              '✓ Subscribed'
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {message && (
          <p className={`subscribe-msg ${status === 'success' ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`subscribe-inline ${variant === 'hero' ? 'subscribe-hero' : ''}`}>
      <form onSubmit={handleSubmit} className="subscribe-inline__form">
        <div className="subscribe-inline__field">
          <input
            id="inline-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="subscribe-inline__input"
            disabled={status === 'loading' || status === 'success'}
            required
          />
          {status === 'idle' && <div className="subscribe-inline__glow" />}
        </div>
        <button
          id="inline-subscribe-btn"
          type="submit"
          className={`btn-primary subscribe-inline__btn ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? (
            <><span className="spinner" /> Subscribing...</>
          ) : status === 'success' ? (
            '✓ You\'re In!'
          ) : (
            'Join the Movement →'
          )}
        </button>
      </form>
      {message && (
        <p className={`subscribe-msg ${status === 'success' ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
