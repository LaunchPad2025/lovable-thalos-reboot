
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-900/50 text-red-300 border border-red-800';
    case 'high':
      return 'bg-orange-900/50 text-orange-300 border border-orange-800';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
    case 'low':
      return 'bg-blue-900/50 text-blue-300 border border-blue-800';
    default:
      return 'bg-gray-900/50 text-gray-300 border border-gray-800';
  }
};

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
          Safety Violations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {results.map((result) => (
          <div key={result.id} className="space-y-4">
            {result.detections && result.detections.length > 0 ? (
              <div className="space-y-4">
                {result.detections.map((detection, index) => (
                  <div key={index} className="bg-[#161b22] rounded-md border border-gray-700 p-3">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-700 text-white text-xs mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">
                          {detection.label ? detection.label.replace(/_/g, ' ') : `Violation ${index + 1}`}
                        </h4>
                        
                        <div className="flex items-center mt-1 mb-2 space-x-2">
                          <Badge className={getSeverityColor(result.severity)}>
                            {getSeverityText(result.severity)}
                          </Badge>
                          {detection.confidence && (
                            <Badge variant="outline" className="text-blue-300 border-blue-800">
                              {(detection.confidence * 100).toFixed(0)}% confidence
                            </Badge>
                          )}
                        </div>
                        
                        {result.regulationIds && result.regulationIds[index] && (
                          <div className="mt-3 bg-[#0d1117] p-2 rounded-md border border-gray-800">
                            <p className="text-xs text-gray-400 mb-1">Applicable Regulation:</p>
                            <div className="flex items-center">
                              <FlagTriangleLeft className="mr-1 h-4 w-4 text-yellow-500" />
                              <p className="text-sm text-yellow-300">{result.regulationIds[index]}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{getRegulationDescription(result.regulationIds[index])}</p>
                          </div>
                        )}
                        
                        <div className="mt-3 text-xs text-gray-400">
                          Location: {result.location || "Work Area"} • 
                          Detected: {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-[#161f2c] rounded-t-md">
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
                      <Badge className={getSeverityColor(result.severity)}>
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

        <div className="mt-6">
          <div className="flex items-center mb-3">
            <HardHat className="mr-2 h-4 w-4 text-yellow-500" />
            <h4 className="text-sm font-medium text-yellow-300">Recommended Actions</h4>
          </div>
          
          <ul className="text-sm text-gray-400 space-y-2 mb-6 ml-6 list-disc">
            <li>Immediately address all high and critical violations</li>
            <li>Document corrective actions taken with photos</li>
            <li>Conduct safety briefing with all workers</li>
            <li>Schedule follow-up inspection within 48 hours</li>
          </ul>
          
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
