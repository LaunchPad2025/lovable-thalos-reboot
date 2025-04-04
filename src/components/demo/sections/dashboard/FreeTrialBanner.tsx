
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FreeTrialBanner = () => {
  const handleUpgrade = () => {
    window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 mb-6">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="font-medium text-white">Free Trial Mode</h3>
          <p className="text-gray-400 text-sm">Unlock all safety compliance features by upgrading to a paid plan</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-3 sm:mt-0" onClick={handleUpgrade}>
          View Plans & Upgrade
        </Button>
      </CardContent>
    </Card>
  );
};

export default FreeTrialBanner;
