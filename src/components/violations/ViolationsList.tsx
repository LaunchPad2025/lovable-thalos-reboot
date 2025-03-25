
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ChevronRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NoViolationsCard from './NoViolationsCard';

interface ViolationDetection {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
  remediationSteps?: string;
}

interface ViolationsListProps {
  detections: ViolationDetection[];
  violationsCount: number;
  imageUrl?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  location?: string;
  regulations?: string[];
  onCreateTask?: () => void;
}

const ViolationsList = ({ 
  detections, 
  violationsCount, 
  imageUrl,
  severity, 
  description,
  location,
  regulations,
  onCreateTask 
}: ViolationsListProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 border-red-800 bg-red-950/30';
      case 'high': return 'text-orange-500 border-orange-800 bg-orange-950/30';
      case 'medium': return 'text-yellow-500 border-yellow-800 bg-yellow-950/30';
      case 'low': return 'text-blue-500 border-blue-800 bg-blue-950/30';
      default: return 'text-gray-500 border-gray-800 bg-gray-950/30';
    }
  };

  const formatLabel = (label: string) => {
    return label
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (violationsCount === 0) {
    return <NoViolationsCard imageUrl={imageUrl} onSave={onCreateTask} />;
  }

  return (
    <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none h-full">
      <CardHeader className={`px-4 py-3 border-b border-gray-800 ${getSeverityColor(severity)}`}>
        <CardTitle className="text-lg flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Safety Violations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          {location && (
            <div>
              <span className="text-gray-500">Location:</span>
              <p className="text-gray-300">{location}</p>
            </div>
          )}
          <div>
            <span className="text-gray-500">Severity:</span>
            <p>
              <Badge className={`mt-1 ${
                severity === 'critical' ? 'bg-red-900 hover:bg-red-900 text-red-200' :
                severity === 'high' ? 'bg-orange-900 hover:bg-orange-900 text-orange-200' :
                severity === 'medium' ? 'bg-yellow-900 hover:bg-yellow-900 text-yellow-200' :
                'bg-blue-900 hover:bg-blue-900 text-blue-200'
              }`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </Badge>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-3">
          <h3 className="text-sm font-medium mb-2">Detected Issues:</h3>
          <ul className="space-y-2">
            {detections.map((detection, index) => (
              <li key={index} className="border border-gray-800 rounded-md p-3 bg-gray-900/50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200">{formatLabel(detection.label)}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Confidence: {Math.round(detection.confidence * 100)}%
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {regulations && regulations.length > 0 && (
          <div className="border-t border-gray-800 pt-3">
            <h3 className="text-sm font-medium mb-2">Relevant Regulations:</h3>
            <ul className="space-y-1">
              {regulations.map((reg, index) => (
                <li key={index} className="text-sm text-gray-400">
                  • {reg}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-gray-800 pt-3 mt-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <p className="text-xs text-gray-500">
              Review findings with a safety expert
            </p>
          </div>
          
          {onCreateTask && (
            <Button 
              size="sm"
              onClick={onCreateTask}
              className="bg-red-600 hover:bg-red-700"
            >
              Create Task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationsList;
