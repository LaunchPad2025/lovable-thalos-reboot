
import React, { useEffect, useRef } from 'react';
import { Message } from '@/components/chatbot/types';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
        <p className="mb-2">No messages yet</p>
        <p className="text-sm">Ask Paulie a question about workplace safety or upload an image for analysis</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id}
          message={message}
        />
      ))}
      
      {isLoading && (
        <div className="flex items-start max-w-[80%] rounded-lg p-3 bg-gray-700 text-white self-start animate-pulse">
          <div className="h-4 w-20 bg-gray-600 rounded"></div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
