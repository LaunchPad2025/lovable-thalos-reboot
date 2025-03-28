
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { TrainingReviewItem } from '../../types';
import { ReviewTableHeader } from './ReviewTableHeader';
import { ReviewTableRow } from './ReviewTableRow';

interface ReviewTableProps {
  data: TrainingReviewItem[];
  onSelectItem: (item: TrainingReviewItem) => void;
}

export const ReviewTable: React.FC<ReviewTableProps> = ({ data, onSelectItem }) => {
  return (
    <Table>
      <ReviewTableHeader />
      <TableBody>
        {data.map((item) => (
          <ReviewTableRow 
            key={item.id} 
            item={item} 
            onSelect={onSelectItem} 
          />
        ))}
      </TableBody>
    </Table>
  );
};
