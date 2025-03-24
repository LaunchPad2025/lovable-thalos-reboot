
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your workplace safety assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand your concern about workplace safety. OSHA regulations specify that proper safety equipment must be worn at all times in this area.",
        "Based on the information you've provided, this should be classified as a medium severity violation that needs to be addressed within 48 hours.",
        "You should document this incident with photos and specific details about when and where it occurred. This will help when filing the report.",
        "I'd recommend assigning this task to your safety supervisor, who can implement the necessary changes to prevent similar incidents.",
        "According to our records, similar violations have occurred in this department before. Consider scheduling additional safety training.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-thalos-blue text-white">
        <h2 className="text-xl font-semibold">Ask Paulie</h2>
        <p className="text-sm opacity-90">Your AI workplace safety assistant</p>
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
                  "max-w-[75%] px-4 py-3 rounded-lg flex items-start",
                  message.sender === 'user' 
                    ? "bg-thalos-blue text-white rounded-tr-none" 
                    : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                )}
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'bot' 
                      ? <Bot size={16} className="text-thalos-blue" /> 
                      : <User size={16} />
                    }
                    <span className="text-xs opacity-75">
                      {message.sender === 'user' ? 'You' : 'Paulie'} • {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit"
          className="bg-thalos-blue hover:bg-blue-600"
          disabled={!newMessage.trim()}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
