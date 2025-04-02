
import React from 'react';
import { HardHat } from 'lucide-react';
import { Message } from '@/components/chatbot/types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className="py-4 border-b border-gray-800 last:border-0">
      <div className="flex items-start gap-3">
        {message.role === 'assistant' ? (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
            <HardHat className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">You</span>
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-300">
              {message.role === 'assistant' ? 'Paulie' : 'You'}
            </span>
            <span className="text-xs text-gray-500">
              • {message.timestamp ? formatTimestamp(message.timestamp) : ''}
            </span>
          </div>
          
          <div className="text-white text-sm whitespace-pre-wrap">
            {message.imageUrl && (
              <div className="mb-2">
                <img 
                  src={message.imageUrl} 
                  alt="Uploaded" 
                  className="rounded-md max-h-40 max-w-full" 
                />
              </div>
            )}
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTimestamp = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes === 1) return '1 minute ago';
  return `${diffInMinutes} minutes ago`;
};

export default MessageBubble;
