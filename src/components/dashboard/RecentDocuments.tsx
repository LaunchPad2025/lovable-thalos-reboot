
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const RecentDocuments = () => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <h3 className="font-medium">Recent Documents</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-900/30 text-purple-300 border border-purple-800 px-2 py-0.5 rounded text-xs ml-1">Pro+</span>
          </div>
        </div>
        
        <div className="text-center py-12 opacity-60 grayscale">
          <p className="text-gray-400 text-sm mb-4">Document management is available for Professional and Enterprise plans</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = "https://cal.com/annieeser/30min"}>
            Contact Sales
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;
