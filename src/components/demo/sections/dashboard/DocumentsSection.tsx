
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsSection = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-gray-400" />
          <h3 className="font-medium text-white">Recent Documents</h3>
          <span className="bg-purple-900/30 text-purple-400 border border-purple-800/30 px-2 py-0.5 rounded-sm text-xs ml-1">Pro+</span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-gray-400 text-sm mb-4">Document management is available on Professional and Enterprise plans</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Upgrade to Pro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
