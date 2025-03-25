
import React from 'react';
import { X } from 'lucide-react';

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
          className="w-full max-h-64 object-contain mx-auto"
        />
        <button
          onClick={removeImage}
          className="absolute top-1 right-1 p-1 bg-gray-900/80 rounded-full text-gray-300 hover:text-white"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
