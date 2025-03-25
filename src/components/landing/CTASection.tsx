
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-900/30 rounded-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve workplace safety?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
          </p>
          <Button 
            onClick={() => navigate('/auth?signup=true')} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
