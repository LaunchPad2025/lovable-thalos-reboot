
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleContactSales = () => {
    window.location.href = "https://cal.com/annieeser/30min";
  };
  
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-900/30 rounded-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve workplace safety?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={handleContactSales} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg"
            >
              Contact Sales
            </Button>
            <Button 
              onClick={() => window.location.href = "https://thalostech.replit.app/auth"}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-md text-lg"
            >
              Sign Up Now
            </Button>
            <Button 
              onClick={() => navigate('/demo')} 
              size="lg"
              variant="outline"
              className="border-blue-700/50 text-white hover:bg-blue-900/30 px-8 py-6 rounded-md text-lg"
            >
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
