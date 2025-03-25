
import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-medium mb-2 text-left">Preview:</h4>
      <img
        src={imageUrl}
        alt="Upload preview"
        className="max-h-[300px] rounded border border-gray-700 mx-auto"
      />
    </div>
  );
};

export default ImagePreview;
