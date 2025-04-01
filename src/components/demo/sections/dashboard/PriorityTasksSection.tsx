
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PriorityTasksSection = () => {
  // Get current year for due dates
  const currentYear = new Date().getFullYear();
  
  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-white">Priority Tasks</h3>
          <div className="text-xs text-gray-400">Limited to 3 <span className="bg-gray-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-sm text-xs ml-1">Free</span></div>
        </div>
        
        <div className="space-y-3">
          <div className="border-b border-gray-800 pb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white">Update emergency evacuation plan</p>
                <p className="text-gray-400 text-sm mt-1">Due: 12/19/{currentYear}</p>
              </div>
              <span className="bg-red-900/30 text-red-400 border border-red-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                High
              </span>
            </div>
          </div>
          
          <div className="border-b border-gray-800 pb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white">Complete monthly safety inspection</p>
                <p className="text-gray-400 text-sm mt-1">Due: 12/14/{currentYear}</p>
              </div>
              <span className="bg-yellow-900/30 text-yellow-400 border border-yellow-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                Medium
              </span>
            </div>
          </div>
          
          <div className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white">Address hazardous materials storage violation</p>
                <p className="text-gray-400 text-sm mt-1">Due: 12/17/{currentYear}</p>
              </div>
              <span className="bg-red-900/30 text-red-400 border border-red-800/30 px-2 py-1 rounded-sm text-xs h-fit">
                Critical
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityTasksSection;
