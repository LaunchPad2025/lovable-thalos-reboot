
import React from 'react';
import { HardHat, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose?: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="p-4 bg-card border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center mr-3">
            <HardHat className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Paulie</h2>
            <p className="text-sm text-muted-foreground">Your AI workplace safety assistant</p>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
