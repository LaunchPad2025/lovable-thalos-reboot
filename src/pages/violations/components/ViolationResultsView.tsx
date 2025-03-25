
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Save, Check, AlertTriangle } from 'lucide-react';
import NoViolationsCard from '@/components/violations/NoViolationsCard';
import { ViolationDetection } from '@/components/violations/types';

interface ViolationResultsViewProps {
  testResults: {
    detections: Array<{
      label: string;
      confidence: number;
      bbox?: number[];
      remediationSteps?: string;
    }>;
    severity: string;
    description: string;
    imagePreview?: string;
    location?: string;
    industry?: string;
  };
  onBackToUpload: () => void;
  onViewViolationsList: () => void;
}

const ViolationResultsView = ({ 
  testResults, 
  onBackToUpload, 
  onViewViolationsList 
}: ViolationResultsViewProps) => {
  const hasDetections = testResults.detections && testResults.detections.length > 0;
  
  const handleSave = () => {
    // Simulating save operation
    setTimeout(() => {
      console.log('Saved violation:', testResults);
      onViewViolationsList();
    }, 500);
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    
    const reportData = {
      title: 'Safety Violation Analysis',
      date: new Date().toLocaleDateString(),
      location: testResults.location || 'Unknown',
      description: testResults.description,
      severity: testResults.severity,
      detections: testResults.detections?.map(d => ({
        type: d.label,
        confidence: (d.confidence * 100).toFixed(1) + '%',
        remediationSteps: d.remediationSteps || 'Contact safety officer'
      }))
    };
    
    const reportBlob = new Blob(
      [JSON.stringify(reportData, null, 2)], 
      { type: 'application/json' }
    );
    
    element.href = URL.createObjectURL(reportBlob);
    element.download = `safety-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  if (!hasDetections) {
    return (
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={onBackToUpload}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-bold">Safety Analysis Results</h2>
        </div>
        
        <NoViolationsCard 
          description={testResults.description || "No safety violations were detected in the analysis."}
          onReset={onBackToUpload}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={onBackToUpload}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-bold">Safety Violation Analysis</h2>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                testResults.severity === 'high' ? 'bg-red-500' :
                testResults.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
              Severity: {testResults.severity.charAt(0).toUpperCase() + testResults.severity.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Location:</strong> {testResults.location || 'Unknown'}</p>
              <p><strong>Industry:</strong> {testResults.industry || 'Construction'}</p>
              <p className="mt-2">{testResults.description}</p>
            </div>
          </CardContent>
        </Card>
        
        {testResults.imagePreview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img 
                  src={testResults.imagePreview} 
                  alt="Violation" 
                  className="w-full h-auto rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detections ({testResults.detections?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResults.detections?.map((detection, index) => {
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
    </div>
  );
};

export default ViolationResultsView;
