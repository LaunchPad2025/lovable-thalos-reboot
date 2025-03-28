
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrainingReviewItem } from './types';
import { ReviewDrawer } from './ReviewDrawer';
import { 
  LoadingState,
  EmptyState,
  ReviewTable,
  ReviewTableActions
} from './components/list';

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
  
  // Render loading state
  if (loading) {
    return <LoadingState />;
  }
  
  // Render empty state
  if (data.length === 0) {
    return <EmptyState onRefresh={onRefresh} />;
  }
  
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <ReviewTable 
              data={data} 
              onSelectItem={setSelectedItem} 
            />
          </div>
          
          <ReviewTableActions 
            itemCount={data.length} 
            onRefresh={onRefresh} 
          />
        </CardContent>
      </Card>
      
      {/* Review Drawer */}
      <ReviewDrawer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onRefresh={onRefresh}
      />
    </>
  );
};

export default TrainingReviewList;
