
import React, { useRef, useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './messages/MessageList';
import MessageInput from './input/MessageInput';
import { useChatMessages } from './useChatMessages';
import { useThemeStyles } from '@/hooks/useThemeStyles';

interface ChatInterfaceProps {
  isPopup?: boolean;
  onClose?: () => void;
}

const ChatInterface = ({ isPopup = false, onClose }: ChatInterfaceProps) => {
  const { messages, isLoading, sendMessage } = useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeStyles();
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle suggested question clicks
  const handleSuggestedQuestionClick = (question: string) => {
    sendMessage(question, null);
  };
  
  return (
    <div className={`flex flex-col h-full bg-[#0F172A] rounded-lg shadow-lg overflow-hidden border border-gray-800 ${isPopup ? 'max-w-md w-full' : ''}`}>
      <ChatHeader onClose={isPopup ? onClose : undefined} />
      
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-800 p-3 bg-[#1A1F2C]">
        <div className="mb-3">
          <h4 className="text-sm text-gray-400 mb-2">Suggested questions:</h4>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleSuggestedQuestionClick("How can I fix these violations?")}
              className="text-xs bg-[#1E293B] text-white px-3 py-1.5 rounded-full hover:bg-[#2D3748]"
            >
              How can I fix these violations?
            </button>
            <button 
              onClick={() => handleSuggestedQuestionClick("What are the penalties for these violations?")}
              className="text-xs bg-[#1E293B] text-white px-3 py-1.5 rounded-full hover:bg-[#2D3748]"
            >
              What are the penalties for these violations?
            </button>
            <button 
              onClick={() => handleSuggestedQuestionClick("Show me the relevant OSHA standards")}
              className="text-xs bg-[#1E293B] text-white px-3 py-1.5 rounded-full hover:bg-[#2D3748]"
            >
              Show me the relevant OSHA standards
            </button>
            <button 
              onClick={() => handleSuggestedQuestionClick("How do I prevent future violations?")}
              className="text-xs bg-[#1E293B] text-white px-3 py-1.5 rounded-full hover:bg-[#2D3748]"
            >
              How do I prevent future violations?
            </button>
          </div>
        </div>
        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
