
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { REJECTION_REASONS } from '../../types';

interface RejectContentProps {
  rejectionReason: string;
  setRejectionReason: (value: string) => void;
}

export const RejectContent: React.FC<RejectContentProps> = ({ 
  rejectionReason, 
  setRejectionReason 
}) => {
  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Rejection Reason</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={rejectionReason}
            onValueChange={setRejectionReason}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {REJECTION_REASONS.map((reason) => (
                <SelectItem key={reason.value} value={reason.value}>
                  {reason.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};
