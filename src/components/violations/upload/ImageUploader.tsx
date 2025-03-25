
import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
      <div className="mb-6 bg-gray-800 p-3 rounded-full">
        <Upload className="h-6 w-6 text-blue-400" />
      </div>
      
      <p className="text-sm text-gray-400 mb-6 text-center">
        Upload images to analyze for safety violations.<br />
        Our AI will detect potential issues and suggest remediation steps.
      </p>
      
      <div className="flex items-center gap-2">
        <Button 
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          <ImageIcon size={16} className="mr-2" />
          Select Image
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: JPEG, PNG, GIF (max 5MB)
      </p>
    </div>
  );
};

export default ImageUploader;
