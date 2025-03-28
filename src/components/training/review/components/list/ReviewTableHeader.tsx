
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const ReviewTableHeader: React.FC = () => {
  return (
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
  );
};
