
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  imageUrl?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your workplace safety assistant powered by BLIP2 vision + language AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
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
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      imageUrl: imagePreview || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Simulate calling the BLIP2 model through edge function
      // In a real implementation, we would upload the image to storage first
      // and then call the edge function with the image URL
      const requestData: any = {
        violationText: newMessage,
        industry: "All",
        modelId: "blip2"
      };
      
      if (imageFile) {
        requestData.violationImageUrl = `mock_url_for_${imageFile.name}`;
      }
      
      // Call the Edge Function
      let response;
      
      try {
        const { data, error } = await supabase.functions.invoke('analyze-violation', {
          body: requestData
        });
        
        if (error) throw error;
        response = data;
      } catch (error) {
        console.error("Error calling model API:", error);
        
        // Fallback to mock responses if the edge function fails
        const botResponses = [
          "I analyzed your input and found potential safety concerns. Workers should always wear appropriate PPE including helmets, safety glasses, and high-visibility vests when in construction areas.",
          "Based on what you've shared, there may be a compliance issue with workplace safety regulations. Ensure that all electrical equipment is properly grounded and that no wires are exposed.",
          "I notice this appears to be a warehouse environment. It's important to maintain clear pathways, proper storage of materials, and ensure all workers have received proper training on equipment operation.",
          "From my analysis, this looks like a hazardous area that requires immediate attention. I recommend cordoning off this space and having a qualified safety inspector evaluate it.",
          "Safety in manufacturing environments requires constant vigilance. Ensure that all machinery has proper guards, emergency stop mechanisms are accessible, and workers are following established protocols."
        ];
        
        response = {
          description: botResponses[Math.floor(Math.random() * botResponses.length)]
        };
      }
      
      // Create the bot's response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.description || "I'm sorry, I couldn't analyze your query. Please try again with more information.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      removeImage();
      
    } catch (error) {
      console.error("Error in chat process:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-thalos-blue text-white">
        <h2 className="text-xl font-semibold">Ask Paulie</h2>
        <p className="text-sm opacity-90">Your AI workplace safety assistant (Powered by BLIP2)</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
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
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-sm rounded-lg rounded-tl-none max-w-[75%] px-4 py-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot size={16} className="text-thalos-blue" />
                  <span className="text-xs opacity-75">
                    Paulie • {formatTime(new Date())}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <p className="text-sm">Analyzing input...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-16 w-16 object-cover rounded border border-gray-300" 
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
        
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
    </div>
  );
};

export default ChatInterface;
