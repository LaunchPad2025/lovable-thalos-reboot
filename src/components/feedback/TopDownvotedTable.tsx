
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { FeedbackData } from './types';
import { format } from 'date-fns';

interface TopDownvotedTableProps {
  feedbackData: FeedbackData;
}

const TopDownvotedTable: React.FC<TopDownvotedTableProps> = ({ feedbackData }) => {
  const { topDownvoted } = feedbackData;
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Downvoted Queries</CardTitle>
      </CardHeader>
      <CardContent>
        {topDownvoted.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No downvoted queries found
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="w-[300px]">Question</TableHead>
                <TableHead className="w-[400px]">Response</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDownvoted.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(item.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {item.question}
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <div className="line-clamp-2">{item.response}</div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="line-clamp-2 text-muted-foreground">
                      {item.notes || 'No feedback provided'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TopDownvotedTable;
