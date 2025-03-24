
import React, { useState, useRef } from 'react';
import { Send, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ImagePreview from './ImagePreview';

interface MessageInputProps {
  onSendMessage: (message: string, imageFile: File | null) => Promise<void>;
  isLoading: boolean;
}

const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "File type not supported",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!newMessage.trim() && !imageFile) || isLoading) return;
    
    try {
      await onSendMessage(newMessage, imageFile);
      setNewMessage('');
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <ImagePreview imagePreview={imagePreview} removeImage={removeImage} />
      
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          <ImageIcon size={18} />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </Button>
        
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        
        <Button 
          type="submit"
          className="bg-thalos-blue hover:bg-blue-600"
          disabled={(!newMessage.trim() && !imageFile) || isLoading}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Upload images of safety concerns for AI analysis or ask questions about workplace safety regulations.
      </p>
    </form>
  );
};

export default MessageInput;
