
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle } from 'lucide-react';

export interface ViolationDetection {
  label: string;
  confidence: number;
  bbox?: number[];
  remediationSteps?: string;
}

interface ViolationDetectionsListProps {
  detections: ViolationDetection[];
}

const ViolationDetectionsList = ({ detections }: ViolationDetectionsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detections ({detections?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {detections?.map((detection, index) => {
            // Ensure detection has a confidence value
            const detectionWithConfidence: ViolationDetection = {
              ...detection,
              confidence: detection.confidence || 0.5
            };
            
            return (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {detectionWithConfidence.label.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </h3>
                    <div className="text-sm text-gray-400">
                      Confidence: {Math.round(detectionWithConfidence.confidence * 100)}%
                    </div>
                  </div>
                  <div className={`p-1 rounded-full ${
                    detectionWithConfidence.confidence > 0.7 ? 'bg-red-500/20 text-red-400' : 
                    detectionWithConfidence.confidence > 0.5 ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {detectionWithConfidence.confidence > 0.7 ? 
                      <AlertTriangle size={16} /> : 
                      <Check size={16} />
                    }
                  </div>
                </div>
                
                {detectionWithConfidence.remediationSteps && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Remediation Steps:</p>
                    <div className="text-sm pl-2 border-l-2 border-gray-700">
                      {detectionWithConfidence.remediationSteps.split('\n').map((step, i) => (
                        <p key={i} className="mb-1">{step}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationDetectionsList;
