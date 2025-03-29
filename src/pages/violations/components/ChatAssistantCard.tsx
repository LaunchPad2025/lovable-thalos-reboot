
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { HardHat } from 'lucide-react';
import ChatInterface from "@/components/chatbot/ChatInterface";

const ChatAssistantCard = () => {
  return (
    <Card className="border border-gray-700 bg-gray-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <span className="bg-yellow-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
            <HardHat className="h-4 w-4" />
          </span>
          Safety Assistant "Paulie"
        </CardTitle>
        <CardDescription>
          Ask me anything about workplace safety regulations and compliance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px]">
          <ChatInterface />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistantCard;
