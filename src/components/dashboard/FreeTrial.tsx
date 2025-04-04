
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const FreeTrial = () => {
  const handleScheduleCall = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-white font-medium mb-1">Demo Mode</h2>
          <p className="text-gray-400 text-sm">Book a 30-minute setup call to get access to all safety compliance features</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center" 
            onClick={handleScheduleCall}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule a Setup Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
