
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleStartFree = () => {
    window.open("https://thalostech.replit.app/", "_blank", "noopener");
  };
  
  const handleTalkToSales = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-900/30 rounded-xl p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to improve workplace safety?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Thalos to enhance safety compliance and reduce incidents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={handleStartFree} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-md text-base sm:text-lg"
            >
              Start Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleTalkToSales} 
              size="lg"
              variant="outline"
              className="border-blue-700/50 text-white hover:bg-blue-900/30 px-6 sm:px-8 py-4 sm:py-6 rounded-md text-base sm:text-lg"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
