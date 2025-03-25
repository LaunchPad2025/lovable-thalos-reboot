
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NoViolationsCardProps {
  onSave: () => void;
}

const NoViolationsCard = ({ onSave }: NoViolationsCardProps) => {
  return (
    <Card className="border-green-800 bg-[#0d1117]">
      <CardHeader className="bg-green-900/30 border-b border-green-800">
        <CardTitle className="text-green-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          No violations detected
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-400">
          The image was analyzed successfully, but no safety violations were found.
        </p>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onSave}>
            Save Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoViolationsCard;
