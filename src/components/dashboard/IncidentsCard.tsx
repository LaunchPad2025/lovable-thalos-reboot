
import React from 'react';
import { ArrowRight, CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const IncidentsCard = () => {
  const { toast } = useToast();
  
  const startIncidentsTour = () => {
    toast({
      title: "Incidents Overview Tour",
      description: "This card shows safety incidents reported in your workplace. Incidents are categorized by severity and tracked over time to identify trends and improvement areas.",
      duration: 5000,
    });
  };
  
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-white">Incidents</h3>
        <Button variant="ghost" size="icon" onClick={startIncidentsTour} className="h-8 w-8">
          <CircleHelp className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-semibold text-white">3</span>
          <span className="text-red-400 text-sm">+1 this month</span>
        </div>
        
        <div className="mt-3 flex space-x-3">
          {/* Simulated chart bars */}
          <div className="h-16 flex items-end space-x-1 flex-1">
            <div className="flex-1 bg-blue-500 rounded-t h-6"></div>
            <div className="flex-1 bg-blue-500 rounded-t h-8"></div>
            <div className="flex-1 bg-blue-500 rounded-t h-4"></div>
            <div className="flex-1 bg-blue-500 rounded-t h-10"></div>
            <div className="flex-1 bg-blue-600 rounded-t h-14"></div>
            <div className="flex-1 bg-blue-600 rounded-t h-12"></div>
          </div>
        </div>
        
        <div className="mt-4">
          <Link to="/violations">
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal" size="sm">
              View incident reports <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IncidentsCard;
