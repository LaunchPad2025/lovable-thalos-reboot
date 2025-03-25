
import React from 'react';
import { CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ComplianceCard = () => {
  const { toast } = useToast();
  
  const startComplianceTour = () => {
    toast({
      title: "Compliance Score Tour",
      description: "Your compliance score is calculated based on completed tasks, resolved violations, and up-to-date safety documentation. Higher scores indicate better workplace safety compliance.",
      duration: 5000,
    });
  };
  
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-white">Compliance Score</h3>
        <Button variant="ghost" size="icon" onClick={startComplianceTour} className="h-8 w-8">
          <CircleHelp className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-semibold text-white">72%</span>
          <span className="text-green-400 text-sm">+5%</span>
        </div>
        
        <div className="mt-3 w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
        </div>
        
        <p className="mt-2 text-gray-400 text-sm">Target: 90%</p>
      </div>
    </div>
  );
};

export default ComplianceCard;
