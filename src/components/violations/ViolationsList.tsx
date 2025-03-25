
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { Detection } from '@/hooks/model-testing/types';

interface ViolationsListProps {
  detections?: Detection[];
  violationsCount?: number;
  imageUrl?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  location?: string;
  regulations?: string[];
  onCreateTask?: () => void;
}

const ViolationsList = ({
  detections = [],
  violationsCount = 0,
  imageUrl,
  severity = 'medium',
  description,
  location,
  regulations = [],
  onCreateTask
}: ViolationsListProps) => {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 p-4">
        <CardTitle className="text-white flex items-center">
          {violationsCount > 0 ? (
            <>
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              {violationsCount === 1 
                ? '1 Violation Detected' 
                : `${violationsCount} Violations Detected`}
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              No Violations Detected
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Severity:</span>
            <Badge className={getSeverityClass(severity)} variant="outline">
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Badge>
          </div>
          
          {location && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Location:</span>
              <span className="text-sm text-gray-400">{location}</span>
            </div>
          )}
          
          {description && (
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-300">Description:</span>
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-b border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Detected Violations:</h4>
          {detections && detections.length > 0 ? (
            <ul className="space-y-2">
              {detections.map((detection, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertTriangle size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">
                      {detection.label?.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Confidence: {((detection.confidence || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No specific violations detected</p>
          )}
        </div>
        
        <div className="p-4 border-b border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Related Regulations:</h4>
          {regulations && regulations.length > 0 ? (
            <ul className="space-y-2">
              {regulations.map((reg, index) => (
                <li key={index} className="text-sm text-gray-400">
                  {reg}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No specific regulations matched</p>
          )}
        </div>
        
        <div className="p-4">
          <Button 
            onClick={onCreateTask} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={violationsCount === 0}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Create Remediation Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationsList;
