
import React from 'react';
import { Bot } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex mb-4">
      <div className="flex flex-row max-w-[80%]">
        <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 mr-2 bg-gray-700">
          <Bot className="h-4 w-4 text-white" />
        </div>
        
        <div className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
