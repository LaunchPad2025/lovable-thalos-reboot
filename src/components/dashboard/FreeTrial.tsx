
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FreeTrial = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#0d1117] border border-blue-900/50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-white">Free Trial Mode</h3>
          <p className="text-sm text-gray-400">Unlock all safety compliance features by upgrading to a paid plan</p>
        </div>
        <Button 
          onClick={() => navigate('/subscription')} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          View Plans & Upgrade
        </Button>
      </div>
    </div>
  );
};

export default FreeTrial;
