
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import DemoCard from '../DemoCard';
import { mockAudits } from '../mockData';

interface AuditsSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const AuditsSection = ({ onShowFeatureInfo, onItemSelect }: AuditsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Audits</h2>
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
          <CardTitle className="text-lg">Safety Audits</CardTitle>
          <CardDescription className="text-gray-400">Your compliance audit schedule</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {mockAudits.map(audit => (
              <div 
                key={audit.id} 
                className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                onClick={() => onItemSelect(audit)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{audit.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">Date: {audit.date} • Score: {audit.score}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    audit.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                    audit.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {audit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <DemoCard message="This is simulated audit data" />
    </div>
  );
};

export default AuditsSection;
