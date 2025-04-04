
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FreeTrial = () => {
  const handleStartFree = () => {
    window.open("https://thalostech.replit.app/", "_blank", "noopener");
  };
  
  const handleTalkToSales = () => {
    window.open("https://cal.com/annie-eser/thalos", "_blank", "noopener");
  };
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-white font-medium mb-1">Try Thalos</h2>
          <p className="text-gray-400 text-sm">Start with 15 free AI-powered safety analyses. No credit card required.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center" 
            onClick={handleStartFree}
          >
            Start Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            className="border-gray-600 text-gray-300"
            onClick={handleTalkToSales}
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
