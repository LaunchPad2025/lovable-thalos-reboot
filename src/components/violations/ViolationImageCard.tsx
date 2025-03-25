
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { TestResult } from '@/hooks/useModelTest';

interface ViolationImageCardProps {
  results: TestResult;
  violationsCount: number;
  onSave: () => void;
}

const ViolationImageCard = ({ results, violationsCount, onSave }: ViolationImageCardProps) => {
  return (
    <Card className="md:col-span-2 bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-white">Analysis Results</CardTitle>
          <p className="text-sm text-gray-400">
            Industry: {results.industry || 'Construction'} | Report ID: VS-{Math.floor(Math.random() * 10000)}
          </p>
        </div>
        <div>
          <Badge className="bg-red-900/50 text-red-300 border border-red-800">
            {violationsCount} {violationsCount === 1 ? 'Violation' : 'Violations'} Detected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-5">
          <div className="relative rounded-md border border-gray-700 overflow-hidden">
            <img 
              src={results.imagePreview || ''} 
              alt="Analyzed image" 
              className="w-full h-auto max-h-[500px] object-contain"
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="absolute bottom-2 right-2 border-gray-700 text-gray-300"
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
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={() => {}}>
            <Download size={16} className="mr-1" />
            Export Report
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSave}>
            <Save size={16} className="mr-1" />
            Save Violations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationImageCard;
