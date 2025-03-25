
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MessageList from '@/components/chatbot/messages/MessageList';
import MessageInput from '@/components/chatbot/input/MessageInput';
import { useChatMessages } from './hooks/useChatMessages';

interface ChatInterfaceProps {
  isPopup?: boolean;
  onClose?: () => void;
}

const ChatInterface = ({ isPopup = false, onClose }: ChatInterfaceProps) => {
  const { messages, isLoading, handleSendMessage } = useChatMessages();

  return (
    <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-auto mb-4">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
