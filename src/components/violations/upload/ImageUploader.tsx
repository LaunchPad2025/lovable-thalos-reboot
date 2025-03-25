
import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
      <div className="mb-6 bg-gray-800 p-3 rounded-full">
        <Upload className="h-6 w-6 text-blue-400" />
      </div>
      
      <p className="text-sm text-gray-400 mb-6">
        Upload images to analyze for safety violations
      </p>
      
      <div className="flex items-center gap-2">
        <label className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
          <span>Select Files</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: JPEG, PNG, GIF
      </p>
    </div>
  );
};

export default ImageUploader;
