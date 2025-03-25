
import React from 'react';
import { HardHat } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="p-4 bg-card border-b border-border">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
          <HardHat className="text-white h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Paulie</h2>
          <p className="text-sm text-muted-foreground">Your AI workplace safety assistant</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
