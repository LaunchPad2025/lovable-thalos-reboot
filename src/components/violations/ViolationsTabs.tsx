
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ViolationItem from './ViolationItem';

interface ViolationsTabsProps {
  detections: any[];
  violationsCount: number;
}

const ViolationsTabs = ({ detections, violationsCount }: ViolationsTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="bg-gray-800">
        <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
          All Violations ({violationsCount})
        </TabsTrigger>
        <TabsTrigger value="uncategorized" className="data-[state=active]:bg-gray-700">
          Uncategorized ({violationsCount})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-6 mt-0">
        {detections.map((detection, index) => {
          // Create confidence values based on detection or random fallback
          const confidence = detection.confidence
            ? Math.round(detection.confidence * 100)
            : Math.round(65 + Math.random() * 25);
            
          // Create regulation number based on index
          const regulationNumber = 
            index === 0 ? "OSHA 29 CFR 1926.501(b)(1)" : 
            index === 1 ? "OSHA 29 CFR 1926.451(g)(1)" : 
            "OSHA 29 CFR 1926.25";
            
          return (
            <ViolationItem 
              key={index}
              index={index}
              detection={detection}
              confidence={confidence}
              regulationNumber={regulationNumber}
            />
          );
        })}
      </TabsContent>
      
      <TabsContent value="uncategorized" className="mt-0">
        <div className="text-center py-10 text-gray-500">
          Same content as the All Violations tab for this demo
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ViolationsTabs;
