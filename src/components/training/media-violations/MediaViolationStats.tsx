
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  byRiskLevel,
}) => {
  const topIndustries = Object.entries(byIndustry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const riskLevels = Object.entries(byRiskLevel)
    .sort((a, b) => {
      const riskOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
      return (riskOrder[a[0] as keyof typeof riskOrder] || 4) - 
             (riskOrder[b[0] as keyof typeof riskOrder] || 4);
    });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Training Dataset Statistics</CardTitle>
        <CardDescription>
          Overview of the media violation training dataset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Entries</span>
            <span className="text-2xl font-bold">{total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Needs Review</span>
            <span className="text-2xl font-bold text-amber-500">{needsReview}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Ready</span>
            <span className="text-2xl font-bold text-blue-500">{ready}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Approved</span>
            <span className="text-2xl font-bold text-green-500">{approved}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Top Industries</h3>
            <div className="flex flex-wrap gap-2">
              {topIndustries.map(([industry, count]) => (
                <Badge key={industry} variant="outline" className="flex gap-1.5">
                  <span>{industry}</span>
                  <span className="text-xs bg-gray-200 px-1.5 rounded-full">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Top Categories</h3>
            <div className="flex flex-wrap gap-2">
              {topCategories.map(([category, count]) => (
                <Badge key={category} variant="outline" className="flex gap-1.5">
                  <span>{category}</span>
                  <span className="text-xs bg-gray-200 px-1.5 rounded-full">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">By Risk Level</h3>
            <div className="flex flex-wrap gap-2">
              {riskLevels.map(([risk, count]) => {
                let badgeClass = 'bg-gray-100';
                if (risk === 'Critical') badgeClass = 'bg-red-100 text-red-800';
                if (risk === 'High') badgeClass = 'bg-orange-100 text-orange-800';
                if (risk === 'Medium') badgeClass = 'bg-yellow-100 text-yellow-800';
                if (risk === 'Low') badgeClass = 'bg-green-100 text-green-800';
                
                return (
                  <Badge key={risk} variant="outline" className={`flex gap-1.5 ${badgeClass}`}>
                    <span>{risk}</span>
                    <span className="text-xs bg-white bg-opacity-30 px-1.5 rounded-full">{count}</span>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaViolationStats;
