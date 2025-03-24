
import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imagePreview: string | null;
  removeImage: () => void;
}

const ImagePreview = ({ imagePreview, removeImage }: ImagePreviewProps) => {
  if (!imagePreview) return null;
  
  return (
    <div className="mb-3 relative inline-block">
      <div className="relative inline-block">
        <img 
          src={imagePreview} 
          alt="Preview" 
          className="h-16 w-16 object-cover rounded border border-gray-300" 
        />
        <button
          type="button"
          onClick={removeImage}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
