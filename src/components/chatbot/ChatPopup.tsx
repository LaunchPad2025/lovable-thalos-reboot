
import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };
  
  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const chatPopup = document.getElementById('chat-popup-container');
      const chatToggle = document.getElementById('chat-popup-toggle');
      
      if (
        isOpen && 
        chatPopup && 
        !chatPopup.contains(target) && 
        chatToggle && 
        !chatToggle.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div id="chat-popup-container" className="mb-4 w-[380px] h-[600px] shadow-xl rounded-lg overflow-hidden">
          <ChatInterface isPopup={true} onClose={() => setIsOpen(false)} />
        </div>
      )}
      
      <Button 
        id="chat-popup-toggle"
        onClick={toggleChat} 
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-[#0EA5E9] hover:bg-[#0284C7]"
        aria-label={isOpen ? "Close chat" : "Open chat"}
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
