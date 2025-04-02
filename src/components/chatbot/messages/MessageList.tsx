
import React from 'react';
import { Message } from '@/components/chatbot/types';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
        <p className="mb-2">No messages yet</p>
        <p className="text-sm">Ask Paulie a question about workplace safety</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id}
          message={message}
        />
      ))}
      
      {isLoading && (
        <div className="flex items-start py-4 border-b border-gray-800">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mr-3">
            <span className="text-white text-sm">P</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-300">Paulie</span>
            </div>
            <div className="flex space-x-1 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
