
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ViolationsTabs from './ViolationsTabs';
import { getSeverityBadgeClass } from './utils/violationHelpers';

interface ViolationsListProps {
  detections: any[];
  violationsCount: number;
}

const ViolationsList = ({ detections, violationsCount }: ViolationsListProps) => {
  // Helper function for rendering severity classes
  const renderSeverityClass = (severity: string): string => {
    return getSeverityBadgeClass(severity);
  };

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
