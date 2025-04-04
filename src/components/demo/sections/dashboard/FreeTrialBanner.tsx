
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const FreeTrialBanner = () => {
  const handleScheduleCall = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 mb-6">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="font-medium text-white">Demo Mode</h3>
          <p className="text-gray-400 text-sm">Book a setup call to get access to all safety compliance features</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white mt-3 sm:mt-0 flex items-center" 
          onClick={handleScheduleCall}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Setup Call
        </Button>
      </CardContent>
    </Card>
  );
};

export default FreeTrialBanner;
