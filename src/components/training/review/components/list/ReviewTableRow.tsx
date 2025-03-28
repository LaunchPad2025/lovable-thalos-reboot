
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { TrainingReviewItem } from '../../types';

interface ReviewTableRowProps {
  item: TrainingReviewItem;
  onSelect: (item: TrainingReviewItem) => void;
}

export const ReviewTableRow: React.FC<ReviewTableRowProps> = ({ item, onSelect }) => {
  // Status badge color mapping
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      case 'rewritten': return 'warning';
      case 'needs_review': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onSelect(item)}
    >
      <TableCell className="font-medium whitespace-nowrap">
        {format(new Date(item.created_at), 'MMM d, yyyy')}
      </TableCell>
      <TableCell className="max-w-[300px] truncate">
        {item.question}
      </TableCell>
      <TableCell>
        {item.industry || 'Unknown'}
      </TableCell>
      <TableCell>
        {item.matched_regulation || 'None'}
      </TableCell>
      <TableCell>
        <Badge 
          variant={
            item.status === 'pending' && item.review_status
              ? getStatusBadgeVariant(item.review_status)
              : getStatusBadgeVariant(item.status)
          }
        >
          {item.status === 'pending' && item.review_status
            ? `Needs Review${item.review_status !== 'needs_review' ? ` (${item.review_status})` : ''}`
            : item.status.charAt(0).toUpperCase() + item.status.slice(1)
          }
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
