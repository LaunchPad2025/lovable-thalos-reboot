
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ViolationsTabs from './ViolationsTabs';
import { TestResult } from '@/hooks/useModelTest';

interface ViolationsListProps {
  detections: any[];
  violationsCount: number;
  renderSeverityClass: (severity: string) => string;
}

const ViolationsList = ({ detections, violationsCount, renderSeverityClass }: ViolationsListProps) => {
  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 px-6 py-4">
        <ViolationsTabs 
          detections={detections} 
          violationsCount={violationsCount} 
        />
      </CardHeader>
      <CardContent className="p-6">
        {/* The TabsContent is now inside ViolationsTabs component */}
      </CardContent>
    </Card>
  );
};

export default ViolationsList;
