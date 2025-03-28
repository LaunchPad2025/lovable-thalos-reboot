
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MediaViolationTraining } from './types';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, AlertTriangle } from 'lucide-react';

interface TableProps {
  data: MediaViolationTraining[];
  onSelectItem: (item: MediaViolationTraining) => void;
  onUpdateStatus: (id: string, status: 'needs_review' | 'ready' | 'approved') => Promise<boolean>;
}

const MediaViolationTable: React.FC<TableProps> = ({
  data,
  onSelectItem,
  onUpdateStatus,
}) => {
  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical':
        return <Badge className="bg-red-500">{riskLevel}</Badge>;
      case 'High':
        return <Badge className="bg-orange-500">{riskLevel}</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-500">{riskLevel}</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">{riskLevel}</Badge>;
      default:
        return <Badge>{riskLevel}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'needs_review':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Needs Review</Badge>;
      case 'ready':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Ready</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-500 border-green-500">Approved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Violation ID</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No violation training data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.violation_id}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="max-w-xs">
                  {truncateText(item.sample_caption)}
                </TableCell>
                <TableCell>{getRiskLevelBadge(item.risk_level)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectItem(item)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {item.status !== 'approved' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateStatus(item.id, 'approved')}
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    
                    {item.status !== 'needs_review' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateStatus(item.id, 'needs_review')}
                        title="Mark for Review"
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MediaViolationTable;
