
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Download, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViolationImageCardProps {
  imageUrl: string | null;
  alt?: string;
  className?: string;
  showPlaceholder?: boolean;
  results?: any;
  violationsCount?: number;
  onSave?: () => void;
}

const ViolationImageCard = ({ 
  imageUrl, 
  alt = "Violation image", 
  className = "", 
  showPlaceholder = true,
  results,
  violationsCount = 0,
  onSave
}: ViolationImageCardProps) => {
  
  if (!imageUrl && !showPlaceholder) {
    return null;
  }

  const handleSaveViolation = () => {
    if (onSave) {
      onSave();
    }
  };
  
  return (
    <Card className={`overflow-hidden border border-gray-700 ${className}`}>
      <CardContent className="p-0">
        {imageUrl ? (
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={alt} 
              className="w-full h-auto object-cover max-h-[550px]" 
            />
            
            {results && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-white font-medium">
                        {violationsCount === 0 
                          ? "No violations detected" 
                          : `${violationsCount} violation${violationsCount !== 1 ? 's' : ''} detected`}
                      </span>
                    </div>
                    {results.severity && (
                      <div className="mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          results.severity === 'critical' ? 'bg-red-900/70 text-red-200' :
                          results.severity === 'high' ? 'bg-orange-900/70 text-orange-200' :
                          results.severity === 'medium' ? 'bg-yellow-900/70 text-yellow-200' :
                          'bg-blue-900/70 text-blue-200'
                        }`}>
                          {results.severity.charAt(0).toUpperCase() + results.severity.slice(1)} Severity
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {violationsCount > 0 && onSave && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={handleSaveViolation}
                      className="bg-red-600 hover:bg-red-700 text-white border-none"
                    >
                      Create Task
                    </Button>
                  )}
                </div>
              </div>
            )}
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
