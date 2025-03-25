
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
import { ClipboardList, AlertTriangle } from 'lucide-react';
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
        <CardTitle className="text-xl">Safety Violation Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
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
            {results.map((result) => (
              <TableRow key={result.id} className="border-gray-800">
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
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              {results.length === 1 ? "1 violation" : `${results.length} violations`} detected
            </p>
          </div>
          {onSave && (
            <Button 
              onClick={onSave} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
