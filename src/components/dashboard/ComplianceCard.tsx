
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ComplianceCard = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="font-medium">Compliance Score</span>
        </div>
        
        <div className="mt-4">
          <h3 className="text-3xl font-bold">87%</h3>
          <p className="text-green-500 text-sm mt-1">+5% from last month</p>
        </div>
        
        <p className="text-gray-400 text-sm mt-4">
          Your compliance score is good. Keep up the good work!
        </p>
        
        <div className="w-full h-2 bg-gray-700 rounded-full mt-4">
          <div className="h-2 bg-green-500 rounded-full" style={{ width: "87%" }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCard;
