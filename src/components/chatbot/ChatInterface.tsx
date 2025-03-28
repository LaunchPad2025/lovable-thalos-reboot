
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MessageList from '@/components/chatbot/messages/MessageList';
import MessageInput from '@/components/chatbot/input/MessageInput';
import { useChatMessages } from './hooks/useChatMessages';
import { Button } from '@/components/ui/button';

interface ChatInterfaceProps {
  isPopup?: boolean;
  onClose?: () => void;
}

const ChatInterface = ({ isPopup = false, onClose }: ChatInterfaceProps) => {
  const { messages, isLoading, handleSendMessage, followUpSuggestions } = useChatMessages();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clear the input value so the same file can be uploaded again if needed
      e.target.value = '';
      
      // Add a default message if the user is only uploading an image without text
      const defaultMessage = "Can you analyze this image for safety violations?";
      handleSendMessage(defaultMessage, file);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-auto mb-4">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
        
        {followUpSuggestions.length > 0 && !isLoading && (
          <div className="mb-4 space-y-2">
            <p className="text-xs text-gray-400">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {followUpSuggestions.map((suggestion, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  className="text-xs bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          onFileSelect={handleFileSelect}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
