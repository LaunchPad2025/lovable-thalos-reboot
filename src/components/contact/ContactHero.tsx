
import React from 'react';

const ContactHero = () => {
  return (
    <div className="relative mb-16 overflow-hidden rounded-xl border border-border z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-900/70 z-10"></div>
      <div className="h-96"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in touch with our team</h2>
        <p className="text-white/80 mb-6 max-w-2xl text-lg">
          Whether you have questions about our products, pricing, or need technical support,
          we're here to help. Reach out to us and we'll respond as soon as we can.
        </p>
      </div>
    </div>
  );
};

export default ContactHero;
