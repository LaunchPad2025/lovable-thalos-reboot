
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import DemoCard from '../DemoCard';
import { mockViolations, getSeverityColor } from '../mockData';

interface ViolationsSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const ViolationsSection = ({ onShowFeatureInfo, onItemSelect }: ViolationsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Violations</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={onShowFeatureInfo}
        >
          <Info className="h-4 w-4 mr-2" />
          About This Feature
        </Button>
      </div>
      <Card className="bg-[#1a1f29] border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Active Violations</CardTitle>
          <CardDescription className="text-gray-400">Your team's active safety violations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {mockViolations.map(violation => (
              <div 
                key={violation.id} 
                className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                onClick={() => onItemSelect(violation)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{violation.description}</h4>
                    <p className="text-sm text-gray-400 mt-1">{violation.location} • {violation.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(violation.severity)}`}>
                    {violation.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <DemoCard message="This is simulated violation data" />
    </div>
  );
};

export default ViolationsSection;
