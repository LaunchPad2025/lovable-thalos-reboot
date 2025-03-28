
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrainingStats } from './types';

interface TrainingReviewStatsProps {
  stats: TrainingStats;
}

const TrainingReviewStats: React.FC<TrainingReviewStatsProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Dataset Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center bg-muted/50 p-3 rounded-md">
            <span className="text-lg font-semibold">{stats.total}</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="flex flex-col items-center bg-muted/50 p-3 rounded-md">
            <span className="text-lg font-semibold">{stats.pending}</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex flex-col items-center bg-green-500/10 p-3 rounded-md">
            <span className="text-lg font-semibold">{stats.approved}</span>
            <span className="text-xs text-muted-foreground">Approved</span>
          </div>
          <div className="flex flex-col items-center bg-red-500/10 p-3 rounded-md">
            <span className="text-lg font-semibold">{stats.rejected}</span>
            <span className="text-xs text-muted-foreground">Rejected</span>
          </div>
        </div>
        
        {/* Top Industries */}
        {stats.byIndustry.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Top Industries</h4>
            <div className="space-y-2">
              {stats.byIndustry.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-sm truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Top Regulations */}
        {stats.byRegulation.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Top Regulations</h4>
            <div className="space-y-2">
              {stats.byRegulation.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-sm truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingReviewStats;
