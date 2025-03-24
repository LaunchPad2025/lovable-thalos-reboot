
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={cn(
        "flex",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-lg flex flex-col",
          message.sender === 'user' 
            ? "bg-thalos-blue text-white rounded-tr-none" 
            : "bg-white text-gray-800 shadow-sm rounded-tl-none"
        )}
      >
        <div className="flex items-center space-x-2 mb-1">
          {message.sender === 'bot' 
            ? <Bot size={16} className="text-thalos-blue" /> 
            : <User size={16} />
          }
          <span className="text-xs opacity-75">
            {message.sender === 'user' ? 'You' : 'Paulie'} • {formatTime(message.timestamp)}
          </span>
        </div>
        
        {message.imageUrl && (
          <div className="mb-2 max-w-[300px]">
            <img 
              src={message.imageUrl} 
              alt="Uploaded" 
              className="rounded-md max-h-[200px] object-contain" 
            />
          </div>
        )}
        
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
