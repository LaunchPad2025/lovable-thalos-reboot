
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

const IncidentsCard = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="font-medium">Recent Incidents</span>
        </div>
        
        <div className="mt-4">
          <h3 className="text-3xl font-bold">2</h3>
          <p className="text-red-500 text-sm mt-1">This month</p>
        </div>
        
        <div className="flex justify-start mt-6">
          <Button variant="link" className="text-blue-400 p-0 h-auto flex items-center">
            View incident reports
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsCard;
