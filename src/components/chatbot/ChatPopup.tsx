
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[600px] shadow-xl animate-fade-in">
          <ChatInterface isPopup={true} onClose={toggleChat} />
        </div>
      )}
      
      <Button 
        onClick={toggleChat} 
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-[#0EA5E9] hover:bg-[#0284C7]"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default ChatPopup;
