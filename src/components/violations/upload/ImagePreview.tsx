
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

const ImagePreview = ({ imageUrl, onRemove }: ImagePreviewProps) => {
  return (
    <div className="mb-6">
      <div className="relative rounded-lg overflow-hidden border-2 border-blue-500/50 mb-4">
        <img 
          src={imageUrl} 
          alt="Image preview" 
          className="w-full max-h-[400px] object-contain mx-auto bg-gray-900/60"
        />
        <Button
          onClick={onRemove}
          size="sm"
          variant="destructive" 
          className="absolute top-2 right-2"
        >
          <X size={16} className="mr-1" /> Remove
        </Button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Image ready for safety violation analysis. You can add a description below to help our AI models detect violations more accurately.
      </p>
    </div>
  );
};

export default ImagePreview;
