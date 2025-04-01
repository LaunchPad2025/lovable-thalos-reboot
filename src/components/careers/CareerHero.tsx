
import React from 'react';

const CareerHero = () => {
  return (
    <div className="relative mb-16 overflow-hidden rounded-xl border border-border z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-900/70 z-10"></div>
      <div className="h-96"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make an impact with your work</h2>
        <p className="text-white/80 mb-6 max-w-2xl text-lg">
          At Thalos Technologies, we're building AI-powered safety solutions that help organizations
          protect their most valuable asset: their people.
        </p>
      </div>
    </div>
  );
};

export default CareerHero;
