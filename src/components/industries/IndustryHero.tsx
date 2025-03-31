
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Industry } from './types';

interface IndustryHeroProps {
  industry: Industry;
}

const IndustryHero: React.FC<IndustryHeroProps> = ({ industry }) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="bg-gradient-to-r from-blue-900/90 to-blue-900/70 p-8 md:p-12 rounded-xl relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {industry.name} Safety Compliance
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-6">
            {industry.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <a href="https://cal.com/company/thalos/demo" target="_blank" rel="noopener noreferrer">
                Schedule a Demo
              </a>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/documentation/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${industry.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
    </div>
  );
};

export default IndustryHero;
