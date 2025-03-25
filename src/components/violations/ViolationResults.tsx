
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, AlertTriangle, Shield, HardHat, FlagTriangleLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getSeverityBadgeClass } from './utils/violationHelpers';

export interface ViolationResult {
  id: string;
  test_name?: string;
  result?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  timestamp: string;
  image_url?: string;
  description?: string;
  detections?: Array<any>;
  regulationIds?: Array<string>;
  industry?: string;
}

export interface ViolationResultsProps {
  results: ViolationResult[];
  onSave?: () => void;
}

const getSeverityText = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'Critical';
    case 'high':
      return 'High Risk';
    case 'medium':
      return 'Medium Risk';
    case 'low':
      return 'Low Risk';
    default:
      return 'Unknown';
  }
};

const getRegulationDescription = (regId: string) => {
  const descriptions: Record<string, string> = {
    '29 CFR 1926.100': 'Head protection requirements',
    '29 CFR 1926.201': 'Signaling requirements for traffic control',
    '29 CFR 1926.451': 'General requirements for scaffolds',
    '29 CFR 1926.501': 'Duty to have fall protection',
    '29 CFR 1926.20': 'General safety and health provisions',
    '29 CFR 1926.25': 'Housekeeping requirements'
  };
  
  // Try to match the beginning of regulation IDs
  const matched = Object.keys(descriptions).find(key => regId.includes(key));
  return matched ? descriptions[matched] : 'Regulation details not available';
};

const ViolationResults = ({ results, onSave }: ViolationResultsProps) => {
  if (!results || results.length === 0) {
    return (
      <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle size={40} className="text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Violations Detected</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No safety violations were identified in the analyzed content. Continue monitoring and following safety protocols.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none">
      <CardHeader className="border-b border-gray-800 p-4">
        <CardTitle className="text-lg flex items-center">
          <Shield className="mr-2 h-5 w-5 text-red-400" />
          Identified Violations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {results.map((result) => (
          <div key={result.id}>
            {result.detections && result.detections.length > 0 ? (
              <div>
                <div className="flex items-center justify-between p-3 bg-[#161b22] border-b border-gray-700">
                  <div className="flex items-center">
                    <span className="text-white font-medium">All Violations ({result.detections.length})</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  {result.detections.map((detection, index) => (
                    <div key={index} className="mt-3 bg-[#161b22] rounded-md border border-gray-700 p-3">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-white font-medium">
                              {detection.label ? detection.label.replace(/_/g, ' ') : `Violation ${index + 1}`}
                            </h4>
                            <Badge className="ml-2 bg-blue-600 text-white">
                              {detection.confidence ? `${(detection.confidence * 100).toFixed(0)}%` : 'medium'}
                            </Badge>
                          </div>
                          
                          {result.regulationIds && result.regulationIds[index] && (
                            <div className="mt-2 text-sm">
                              <div className="text-gray-300 font-medium">{result.regulationIds[index]}</div>
                              <div className="text-gray-400">Location: {result.location || "Work area"}</div>
                            </div>
                          )}
                          
                          <p className="mt-2 text-sm text-gray-300">
                            {detection.remediationSteps || 
                              `Workers are potentially exposed to hazards related to ${detection.label?.replace(/_/g, ' ') || 'safety violations'}, creating a serious safety risk.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-[#161b22] rounded-t-md">
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400 font-medium">Severity</TableHead>
                    <TableHead className="text-gray-400 font-medium">Description</TableHead>
                    <TableHead className="text-gray-400 font-medium">Location</TableHead>
                    <TableHead className="text-gray-400 font-medium">Detected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-800">
                    <TableCell>
                      <Badge className={getSeverityBadgeClass(result.severity)}>
                        {getSeverityText(result.severity)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {result.description || result.result || "Safety violation detected"}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {result.location || "Unknown location"}
                    </TableCell>
                    <TableCell className="text-gray-300 whitespace-nowrap">
                      {result.timestamp 
                        ? formatDistanceToNow(new Date(result.timestamp), { addSuffix: true }) 
                        : "Recently"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        ))}

        <div className="p-4 pt-3 border-t border-gray-700">
          {onSave && (
            <Button 
              onClick={onSave} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ClipboardList size={16} className="mr-2" />
              Create Remediation Task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationResults;
