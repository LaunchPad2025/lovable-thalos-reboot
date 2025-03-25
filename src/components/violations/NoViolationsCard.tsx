
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, AlertTriangle, FileText } from 'lucide-react';

interface NoViolationsCardProps {
  onSave?: () => void;
  onNewAnalysis?: () => void;
  imageUrl?: string;
  industry?: string;
  onCreateTask?: () => void;
  onReset?: () => void;
  description?: string;
}

const NoViolationsCard = ({ 
  onSave, 
  onNewAnalysis, 
  imageUrl, 
  industry = 'Construction', 
  onCreateTask,
  onReset,
  description
}: NoViolationsCardProps) => {
  return (
    <Card className="border-green-800 bg-[#0d1117]">
      <CardHeader className="bg-green-900/30 border-b border-green-800">
        <CardTitle className="text-green-400 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          No violations detected
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {imageUrl && (
          <div className="mb-4 rounded overflow-hidden border border-gray-700">
            <img src={imageUrl} alt="Analyzed image" className="w-full h-auto" />
          </div>
        )}
        
        <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700 mb-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Important Note</h4>
              <p className="text-gray-400 text-sm">
                While our AI analysis did not detect safety violations, this does not guarantee complete safety compliance. 
                Always conduct thorough physical inspections according to {industry} industry standards.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 mb-4">
          {description || "The image was analyzed successfully, but no safety violations were detected by our AI system."}
        </p>

        <div className="bg-blue-900/20 p-4 rounded-md border border-blue-800 mb-4">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Recommendation</h4>
              <p className="text-gray-400 text-sm">
                Even though no violations were detected, we recommend following these general safety practices:
              </p>
              <ul className="text-gray-400 text-sm list-disc pl-5 mt-2 space-y-1">
                <li>Ensure all workers wear appropriate PPE for their tasks</li>
                <li>Maintain clear walkways and emergency exits</li>
                <li>Properly store all materials and equipment when not in use</li>
                <li>Conduct regular safety inspections of the work area</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-3">
          {onNewAnalysis || onReset ? (
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300" 
              onClick={onNewAnalysis || onReset}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          ) : null}
          {(onSave || onCreateTask) && (
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white" 
              onClick={onSave || onCreateTask}
            >
              Save Report
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoViolationsCard;
