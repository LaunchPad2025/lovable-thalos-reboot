
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Check, Pencil, X, RefreshCw } from 'lucide-react';
import { TrainingReviewItem } from './types';
import { ReviewDrawer } from './ReviewDrawer';

interface TrainingReviewListProps {
  data: TrainingReviewItem[];
  loading: boolean;
  onRefresh: () => Promise<void>;
}

const TrainingReviewList: React.FC<TrainingReviewListProps> = ({ 
  data, 
  loading,
  onRefresh
}) => {
  const [selectedItem, setSelectedItem] = useState<TrainingReviewItem | null>(null);
  
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
  
  // Handle refresh
  const handleRefresh = async () => {
    await onRefresh();
  };
  
  // Render loading state
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Loading training data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render empty state
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center text-center">
            <p className="mb-4 text-lg font-medium">No training data to review</p>
            <p className="text-muted-foreground mb-6 max-w-md">
              No thumbs-down feedback or flagged conversations found that match your current filters.
            </p>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[300px]">Question</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Regulation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedItem(item)}
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
                            setSelectedItem(item);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="py-4 px-6 flex justify-between items-center border-t">
            <div className="text-sm text-muted-foreground">
              Showing {data.length} items
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Review Drawer */}
      <ReviewDrawer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onRefresh={handleRefresh}
      />
    </>
  );
};

export default TrainingReviewList;
