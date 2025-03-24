
import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './messages/MessageList';
import MessageInput from './input/MessageInput';
import { useChatMessages } from './useChatMessages';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChatMessages();
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      <ChatHeader />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
