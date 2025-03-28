
import React, { useState } from 'react';
import { Send, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: (message: string, imageFile?: File | null) => Promise<void>;
  isLoading: boolean;
  onFileSelect?: () => void;
}

const MessageInput = ({ onSendMessage, isLoading, onFileSelect }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendClick = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await onSendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg p-1">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Paulie about safety regulations..."
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isLoading}
        />
        
        {onFileSelect && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onFileSelect}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
            disabled={isLoading}
            title="Upload image for safety analysis"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon"
          onClick={handleSendClick}
          className="text-blue-500 hover:text-blue-400 hover:bg-gray-700"
          disabled={isLoading || !newMessage.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
