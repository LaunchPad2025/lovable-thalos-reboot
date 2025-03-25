
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ViolationImageCardProps {
  imageUrl: string | null;
  alt?: string;
  className?: string;
  showPlaceholder?: boolean;
}

const ViolationImageCard = ({ 
  imageUrl, 
  alt = "Violation image", 
  className = "", 
  showPlaceholder = true 
}: ViolationImageCardProps) => {
  
  if (!imageUrl && !showPlaceholder) {
    return null;
  }
  
  return (
    <Card className={`overflow-hidden border border-gray-700 ${className}`}>
      <CardContent className="p-0">
        {imageUrl ? (
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={alt} 
              className="w-full h-auto object-cover max-h-[350px]" 
            />
          </div>
        ) : showPlaceholder ? (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-800 text-gray-400">
            <AlertTriangle className="mb-2 h-10 w-10 opacity-40" />
            <p>No image available</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ViolationImageCard;
