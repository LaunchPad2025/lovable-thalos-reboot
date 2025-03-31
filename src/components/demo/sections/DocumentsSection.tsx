
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import DemoCard from '../DemoCard';
import { mockDocuments } from '@/components/documents/mockData';

interface DocumentsSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

const DocumentsSection = ({ onShowFeatureInfo, onItemSelect }: DocumentsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={onShowFeatureInfo}
        >
          <Info className="h-4 w-4 mr-2" />
          About This Feature
        </Button>
      </div>
      <Card className="bg-[#1a1f29] border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Safety Documents</CardTitle>
          <CardDescription className="text-gray-400">Your safety documentation library</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {mockDocuments.slice(0, 5).map(doc => (
              <div 
                key={doc.id} 
                className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                onClick={() => onItemSelect(doc)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">Type: {doc.type} • Updated: {doc.lastModified}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500`}>
                    {doc.fileType.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <DemoCard message="This is simulated document data" />
    </div>
  );
};

export default DocumentsSection;
