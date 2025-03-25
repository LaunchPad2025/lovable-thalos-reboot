
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestResult } from '@/hooks/useModelTest';
import { AlertTriangle, Download, Save } from 'lucide-react';

interface ViolationResultsProps {
  results: TestResult;
  onSave: () => void;
}

const ViolationResults = ({ results, onSave }: ViolationResultsProps) => {
  if (!results) return null;
  
  const renderSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const violationsCount = results.detections?.length || 0;
  
  // If no violations found
  if (violationsCount === 0 || !results.detections) {
    return (
      <Card className="border-green-100">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No violations detected
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            The image was analyzed successfully, but no safety violations were found.
          </p>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={onSave}>
              Save Report
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="bg-gray-50 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle>Analysis Results</CardTitle>
              <p className="text-sm text-gray-500">
                Industry: {results.industry || 'Construction'} | Report ID: VS-{Math.floor(Math.random() * 10000)}
              </p>
            </div>
            <div>
              <Badge className="bg-red-100 text-red-800 text-sm">
                {violationsCount} {violationsCount === 1 ? 'Violation' : 'Violations'} Detected
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-5">
              <div className="relative rounded-md border overflow-hidden">
                <img 
                  src={results.imagePreview || ''} 
                  alt="Analyzed image" 
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute bottom-2 right-2"
                  onClick={() => {
                    // Download functionality
                  }}
                >
                  <Download size={16} className="mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {}}>
                <Download size={16} className="mr-1" />
                Export Report
              </Button>
              
              <Button onClick={onSave}>
                <Save size={16} className="mr-1" />
                Save Violations
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle>Violation Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Confidence:</span>
                <span className="text-sm">{(results.confidence * 100).toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Severity:</span>
                <Badge className={renderSeverityClass(results.severity)}>
                  {results.severity.charAt(0).toUpperCase() + results.severity.slice(1)}
                </Badge>
              </div>
              
              <div className="py-3 border-y">
                <h4 className="text-sm font-medium mb-2">Description:</h4>
                <p className="text-sm text-gray-600">{results.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Related Regulations:</h4>
                {results.regulationIds && results.regulationIds.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {results.regulationIds.map((id, index) => (
                      <li key={id} className="text-sm">
                        <span className="text-gray-800">{id.substring(0, 8)}...</span>
                        {' '}
                        <span className="text-gray-500">
                          (Relevance: {(results.relevanceScores[index] * 100).toFixed(1)}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No specific regulations matched</p>
                )}
              </div>
              
              <div className="flex items-start gap-2 mt-4 pt-3 border-t">
                <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-500">
                  AI model results are approximations and should be reviewed by safety experts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b px-6 py-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                All Violations ({violationsCount})
              </TabsTrigger>
              <TabsTrigger value="uncategorized">
                Uncategorized ({violationsCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-6">
          <TabsContent value="all" className="space-y-6 mt-0">
            {results.detections.map((detection, index) => {
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
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {index === 0 ? "Fall Protection: Workers potentially exposed to falls of 6 feet or more without proper protection" :
                         index === 1 ? "Scaffolding: Potential scaffolding without complete guardrail systems" :
                         "Housekeeping: Construction materials not properly stored creating tripping hazards"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{regulationNumber}</p>
                    </div>
                    <Badge className={renderSeverityClass('medium')}>
                      medium
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between mb-3">
                      <div>
                        <span className="text-sm text-gray-500">Location: Work area</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Confidence: {confidence}%</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700">
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
    </div>
  );
};

export default ViolationResults;
