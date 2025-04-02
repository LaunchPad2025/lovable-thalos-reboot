
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import MessageList from '@/components/chatbot/messages/MessageList';
import { useChatMessages } from './hooks/useChatMessages';

interface ChatInterfaceProps {
  isPopup?: boolean;
  onClose?: () => void;
}

const ChatInterface = ({ isPopup = false, onClose }: ChatInterfaceProps) => {
  const { messages, isLoading, sendMessage } = useChatMessages();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] rounded-lg overflow-hidden">
      <div className="flex-1 overflow-auto p-2" ref={containerRef}>
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      
      <div className="border-t border-gray-800 p-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (inputRef.current?.value) {
              handleSendMessage(inputRef.current.value);
              inputRef.current.value = '';
            }
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask Paulie a safety question..."
            className="flex-1 bg-[#1a1f29] text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            <Send size={18} />
            <span className="ml-2">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
