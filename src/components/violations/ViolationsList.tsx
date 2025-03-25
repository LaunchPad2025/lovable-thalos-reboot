
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ViolationsTabs from './ViolationsTabs';
import { getSeverityBadgeClass } from './utils/violationHelpers';
import { TestResult } from '@/hooks/model-testing/types';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ViolationsListProps {
  detections: TestResult['detections'];
  violationsCount: number;
  imageUrl?: string | null;
  severity?: string;
  description?: string;
  location?: string;
  regulations?: string[];
  onCreateTask?: () => void;
}

const ViolationsList = ({ 
  detections, 
  violationsCount,
  imageUrl,
  severity = 'medium',
  description = 'Violation Detected',
  location = 'Work Area',
  regulations = [],
  onCreateTask
}: ViolationsListProps) => {
  // Helper function for rendering severity classes
  const renderSeverityClass = (severity: string): string => {
    return getSeverityBadgeClass(severity);
  };

  const renderSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Critical';
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Medium Risk';
    }
  };

  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 px-6 py-4 flex flex-row items-center">
        <div className="flex items-center text-white">
          <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-red-400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15H12.01M12 9V12M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Identified Violations
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-[#161b22]">
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400 font-medium w-1/6">Severity</TableHead>
              <TableHead className="text-gray-400 font-medium w-2/5">Description</TableHead>
              <TableHead className="text-gray-400 font-medium w-1/5">Location</TableHead>
              <TableHead className="text-gray-400 font-medium w-1/5">Detected</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-800">
              <TableCell>
                <Badge className={renderSeverityClass(severity)}>
                  {renderSeverityText(severity)}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300">
                {description}
              </TableCell>
              <TableCell className="text-gray-300">
                {location}
              </TableCell>
              <TableCell className="text-gray-300 whitespace-nowrap">
                {formatDistanceToNow(new Date(), { addSuffix: true })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {detections && detections.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Detected Violations ({violationsCount}):</h3>
            <div className="space-y-3">
              {detections.map((detection, idx) => (
                <div key={idx} className="bg-[#161b22] rounded-md border border-gray-700 p-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium">
                      {detection.label ? detection.label.replace(/_/g, ' ') : `Violation ${idx + 1}`}
                    </h4>
                    {detection.confidence && (
                      <Badge className="bg-blue-900/50 text-blue-300 border border-blue-800">
                        {Math.round(detection.confidence * 100)}% confidence
                      </Badge>
                    )}
                  </div>
                  
                  {regulations && regulations[idx] && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-400">Regulation: </span>
                      <span className="text-gray-300">{regulations[idx]}</span>
                    </div>
                  )}
                  
                  {detection.remediationSteps && (
                    <div className="mt-2 text-sm text-gray-400">
                      {detection.remediationSteps.split('\n')[0]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-700">
          <Button 
            onClick={onCreateTask} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ClipboardList size={16} className="mr-2" />
            Create Remediation Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationsList;
