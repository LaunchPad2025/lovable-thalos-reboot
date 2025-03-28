
import React from 'react';
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
import { Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { MediaViolationTraining } from './types';

interface TableProps {
  data: MediaViolationTraining[];
  onSelectItem: (item: MediaViolationTraining) => void;
  onUpdateStatus: (id: string, status: 'needs_review' | 'ready' | 'approved') => Promise<boolean>;
}

const MediaViolationTable: React.FC<TableProps> = ({
  data,
  onSelectItem,
  onUpdateStatus
}) => {
  // Render risk level badge with appropriate color
  const getRiskLevelBadge = (level: string) => {
    let color = '';
    
    switch (level) {
      case 'Low':
        color = 'bg-blue-900/20 text-blue-400 border-blue-900/30';
        break;
      case 'Medium':
        color = 'bg-amber-900/20 text-amber-400 border-amber-900/30';
        break;
      case 'High':
        color = 'bg-orange-900/20 text-orange-400 border-orange-900/30';
        break;
      case 'Critical':
        color = 'bg-red-900/20 text-red-400 border-red-900/30';
        break;
      default:
        color = 'bg-gray-900/20 text-gray-400 border-gray-900/30';
    }
    
    return <Badge variant="outline" className={color}>{level}</Badge>;
  };
  
  // Render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    let color = '';
    let icon = null;
    
    switch (status) {
      case 'needs_review':
        color = 'bg-amber-900/20 text-amber-400 border-amber-900/30';
        icon = <AlertTriangle className="h-3 w-3 mr-1" />;
        break;
      case 'ready':
        color = 'bg-blue-900/20 text-blue-400 border-blue-900/30';
        break;
      case 'approved':
        color = 'bg-green-900/20 text-green-400 border-green-900/30';
        icon = <CheckCircle className="h-3 w-3 mr-1" />;
        break;
      default:
        color = 'bg-gray-900/20 text-gray-400 border-gray-900/30';
    }
    
    return (
      <Badge variant="outline" className={`flex items-center ${color}`}>
        {icon}
        <span>{status.replace('_', ' ')}</span>
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Violation ID</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No violations found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.violation_id}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{getRiskLevelBadge(item.risk_level)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onSelectItem(item)}
                    className="w-full flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
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
