
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FreeTrial = () => {
  const navigate = useNavigate();
  
  const handleContactSales = () => {
    navigate('/subscription');
  };
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-white font-medium mb-1">Free Trial Mode</h2>
          <p className="text-gray-400 text-sm">Unlock all safety compliance features by contacting our sales team</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 md:mt-0" onClick={handleContactSales}>
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default FreeTrial;
