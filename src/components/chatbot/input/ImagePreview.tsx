
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  imagePreview: string | null;
  removeImage: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imagePreview, removeImage }) => {
  if (!imagePreview) return null;
  
  return (
    <div className="relative mb-3">
      <div className="relative rounded-md overflow-hidden border border-gray-700 bg-gray-900">
        <img 
          src={imagePreview} 
          alt="Upload preview" 
          className="w-full h-auto max-h-[200px] object-contain mx-auto"
        />
        <Button
          onClick={removeImage}
          size="sm"
          variant="ghost" 
          className="absolute top-1 right-1 p-1 bg-gray-900/80 rounded-full text-gray-300 hover:text-white h-auto"
          type="button"
          aria-label="Remove image"
        >
          <X size={16} />
        </Button>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Image ready for analysis. Images help our AI provide more accurate responses.
      </p>
    </div>
  );
};

export default ImagePreview;
