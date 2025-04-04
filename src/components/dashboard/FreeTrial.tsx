
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FreeTrial = () => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
  };
  
  const handleContactSales = () => {
    window.location.href = "https://cal.com/annieeser/30min";
  };
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-white font-medium mb-1">Free Trial Mode</h2>
          <p className="text-gray-400 text-sm">Unlock all safety compliance features by upgrading to a paid plan</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpgrade}>
            Upgrade Plan
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800" onClick={handleContactSales}>
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
