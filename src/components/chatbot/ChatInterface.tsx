
import React from 'react';
import MessageList from './messages/MessageList';
import MessageInput from './input/MessageInput';
import { useChatMessages } from './useChatMessages';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChatMessages();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
        <MessageList messages={messages} />
      </div>
      <div className="border-t border-gray-700 bg-gray-800">
        <MessageInput 
          onSendMessage={sendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default ChatInterface;
