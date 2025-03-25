
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, MoreHorizontal, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Document } from './types';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const { title, type, date, owner, fileSize, fileType } = document;
  
  const getIcon = () => {
    return <FileText className="h-8 w-8 text-blue-400" />;
  };
  
  return (
    <Card className="overflow-hidden bg-[#0f1419] border-gray-800 hover:border-gray-700 transition-all duration-200">
      <CardContent className="p-0">
        <div className={cn("h-32 flex items-center justify-center", 
          type === "safety" ? "bg-red-900/20" : 
          type === "training" ? "bg-green-900/20" : 
          type === "report" ? "bg-yellow-900/20" : "bg-blue-900/20"
        )}>
          {getIcon()}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-white truncate" title={title}>{title}</h3>
          <div className="mt-2 flex items-center text-xs text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
            <span className="mx-1.5">•</span>
            <User className="h-3 w-3 mr-1" />
            <span>{owner}</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {fileSize} • {fileType.toUpperCase()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-[#131820] flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
          <Download className="h-3.5 w-3.5 mr-1" />
          Download
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
