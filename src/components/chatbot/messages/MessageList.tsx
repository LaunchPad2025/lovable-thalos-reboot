
import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm rounded-lg rounded-tl-none max-w-[75%] px-4 py-3">
              <div className="flex items-center space-x-2 mb-1">
                <Bot size={16} className="text-thalos-blue" />
                <span className="text-xs opacity-75">
                  Paulie • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin" />
                <p className="text-sm">Analyzing input...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
