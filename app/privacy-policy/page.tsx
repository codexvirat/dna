import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container section-padding">
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <p style={{ marginBottom: '1.5rem' }}>Last updated: June 2026</p>

        <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, payment method, and other information you choose to provide.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. Use of Information</h3>
        <p>We may use the information we collect about you to: Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Sharing of Information</h3>
        <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: With third party service providers who need access to such information to carry out work on our behalf.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Security</h3>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
      </div>
    </div>
  );
}
