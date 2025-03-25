
import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './ChatInterface';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const toggleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };
  
  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (
        isOpen && 
        popupRef.current && 
        !popupRef.current.contains(target) && 
        buttonRef.current && 
        !buttonRef.current.contains(target)
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
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          ref={popupRef}
          className="mb-4 w-[380px] h-[600px] shadow-xl rounded-lg overflow-hidden bg-[#0d1117] border border-gray-800"
        >
          <ChatInterface isPopup={true} onClose={() => setIsOpen(false)} />
        </div>
      )}
      
      <Button 
        ref={buttonRef}
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
