
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col p-4">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          allMessages={messages} 
        />
      ))}
      
      {isLoading && <LoadingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
