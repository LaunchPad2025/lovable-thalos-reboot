
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsProps {
  total: number;
  needsReview: number;
  ready: number;
  approved: number;
  byIndustry: Record<string, number>;
  byCategory: Record<string, number>;
  byRiskLevel: Record<string, number>;
}

const MediaViolationStats: React.FC<StatsProps> = ({
  total,
  needsReview,
  ready,
  approved,
  byIndustry,
  byCategory,
  byRiskLevel
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-card">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Violations</h3>
          <p className="text-2xl font-bold mt-1">{total}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Needs Review</h3>
          <p className="text-2xl font-bold mt-1 text-amber-500">{needsReview}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Ready</h3>
          <p className="text-2xl font-bold mt-1 text-blue-500">{ready}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Approved</h3>
          <p className="text-2xl font-bold mt-1 text-green-500">{approved}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaViolationStats;
