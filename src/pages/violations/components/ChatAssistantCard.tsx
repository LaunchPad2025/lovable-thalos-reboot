
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const ChatAssistantCard: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a demo, we'll just redirect to the chatbot page
      navigate('/chatbot');
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="border-b border-gray-700 pb-3">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 text-yellow-500 mr-2" />
          Ask Paulie - Your Safety Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <p className="text-yellow-400 font-medium text-sm">Paulie</p>
            <p className="mt-1 text-sm">
              Hello! I'm Paulie, your safety assistant. Ask me about workplace safety regulations, 
              OSHA standards, or best practices for your industry.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Try asking:</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                "What PPE is required for welding?",
                "Tell me about fall protection standards",
                "How to handle chemical spills safely?"
              ].map((suggestion, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="justify-start h-auto py-2 text-left text-sm border-gray-700 hover:bg-gray-700"
                  onClick={() => navigate('/chatbot')}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              className="bg-gray-900 border-gray-700"
              placeholder="Type your safety question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistantCard;
