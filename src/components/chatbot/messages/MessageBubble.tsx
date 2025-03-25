
import React from 'react';
import { User, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
        "flex mb-4",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      {message.sender === 'bot' && (
        <div className="mr-2">
          <Avatar className="h-8 w-8 border-2 border-[#9b87f5] bg-[#1A1F2C]">
            <AvatarFallback className="bg-[#9b87f5] text-white">
              <HardHat className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-lg flex flex-col",
          message.sender === 'user' 
            ? "bg-[#4D7CFF] text-white rounded-tr-none" 
            : "bg-[#1E293B] text-white border border-gray-700 rounded-tl-none"
        )}
      >
        <div className="flex items-center space-x-2 mb-1">
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
      
      {message.sender === 'user' && (
        <div className="ml-2">
          <Avatar className="h-8 w-8 bg-gray-700">
            <AvatarFallback className="bg-gray-700 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
