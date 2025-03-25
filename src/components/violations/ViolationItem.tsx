
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getSeverityBadgeClass } from './utils/severityUtils';

interface ViolationItemProps {
  index: number;
  detection: any;
  confidence: number;
  regulationNumber: string;
}

const ViolationItem = ({ index, detection, confidence, regulationNumber }: ViolationItemProps) => {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#0f1419]">
      <div className="p-4 border-b border-gray-800 flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">
            {index === 0 
              ? "Fall Protection: Workers potentially exposed to falls of 6 feet or more without proper protection" 
              : index === 1 
                ? "Scaffolding: Potential scaffolding without complete guardrail systems" 
                : "Housekeeping: Construction materials not properly stored creating tripping hazards"}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{regulationNumber}</p>
        </div>
        <Badge className={getSeverityBadgeClass('medium')}>
          medium
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div>
            <span className="text-sm text-gray-400">Location: Work area</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">Confidence: {confidence}%</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-300">
          {index === 0 
            ? "Workers are operating at heights without proper fall protection systems. No personal fall arrest systems, guardrails, or safety nets are visible, creating a serious fall hazard." 
            : index === 1 
              ? "Safety violation detected: Scaffolding: Potential scaffolding without complete guardrail systems in a construction environment." 
              : "Construction materials scattered across work area creating potential tripping hazards and impeding safe movement through the space."}
        </p>
      </div>
    </div>
  );
};

export default ViolationItem;
