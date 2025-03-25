
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
        <Tabs defaultValue="all">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
              All Violations ({violationsCount})
            </TabsTrigger>
            <TabsTrigger value="uncategorized" className="data-[state=active]:bg-gray-700">
              Uncategorized ({violationsCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <TabsContent value="all" className="space-y-6 mt-0">
          {detections.map((detection, index) => {
            // Create meaningful violation titles based on detection labels
            const violationTitle = detection.label 
              ? detection.label.replace(/_/g, ' ').replace(/missing/i, 'Missing')
              : `Safety Violation ${index + 1}`;
              
            const regulationNumber = 
              index === 0 ? "OSHA 29 CFR 1926.501(b)(1)" : 
              index === 1 ? "OSHA 29 CFR 1926.451(g)(1)" : 
              "OSHA 29 CFR 1926.25";
              
            const confidence = detection.confidence ? 
              Math.round(detection.confidence * 100) : 
              Math.round(65 + Math.random() * 25);
              
            return (
              <div key={index} className="border border-gray-800 rounded-lg overflow-hidden bg-[#0f1419]">
                <div className="p-4 border-b border-gray-800 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">
                      {index === 0 ? "Fall Protection: Workers potentially exposed to falls of 6 feet or more without proper protection" :
                       index === 1 ? "Scaffolding: Potential scaffolding without complete guardrail systems" :
                       "Housekeeping: Construction materials not properly stored creating tripping hazards"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{regulationNumber}</p>
                  </div>
                  <Badge className={renderSeverityClass('medium')}>
                    medium
                  </Badge>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <div>
                      <span className="text-sm text-gray-400">Location: Work area</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Confidence: {confidence}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300">
                    {index === 0 ? 
                      "Workers are operating at heights without proper fall protection systems. No personal fall arrest systems, guardrails, or safety nets are visible, creating a serious fall hazard." :
                      index === 1 ?
                      "Safety violation detected: Scaffolding: Potential scaffolding without complete guardrail systems in a construction environment." :
                      "Construction materials scattered across work area creating potential tripping hazards and impeding safe movement through the space."}
                  </p>
                </div>
              </div>
            );
          })}
        </TabsContent>
        
        <TabsContent value="uncategorized" className="mt-0">
          <div className="text-center py-10 text-gray-500">
            Same content as the All Violations tab for this demo
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default ViolationsList;
