import React from 'react';

export default function FAQ() {
  return (
    <div className="container section-padding">
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient text-center" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff' }}>What makes DNA Bars different?</h3>
          <p>We use a Triple Threat Formula that combines premium protein with adaptogens (Ashwagandha) and performance enhancers (Creatine/Collagen) in a dessert-like bar.</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff' }}>When is the best time to eat a DNA Bar?</h3>
          <p>They are perfect post-workout for recovery, or as a mid-day snack to keep your protein intake high and manage stress levels.</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff' }}>Are the bars vegan?</h3>
          <p>Currently, our bars contain whey protein isolate and collagen (in the Blueberry Muffin flavor), so they are not vegan. We are developing a plant-based line for the future.</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff' }}>Do you ship internationally?</h3>
          <p>Currently, we ship across India. International shipping will be available soon.</p>
        </div>
      </div>
    </div>
  );
}
