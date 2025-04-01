
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatInterface from '@/components/chatbot/ChatInterface';
import { PageTitle } from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

const Chatbot = () => {
  return (
    <PageContainer className="space-y-4">
      <div className="flex justify-between items-center">
        <PageTitle 
          title="Safety Copilot" 
          subtitle="Ask Paulie about workplace safety, regulations, and best practices" 
        />
        
        <Button variant="outline" className="flex items-center gap-2">
          <Lightbulb size={16} />
          Suggest a Feature
        </Button>
      </div>
      
      <div className="border border-gray-800 rounded-lg bg-[#0d1117] shadow-xl h-[calc(100vh-12rem)]">
        <div className="p-4 border-b border-gray-800 bg-[#0d1117]">
          <h2 className="text-xl font-bold text-white flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2">
              <span className="font-semibold">P</span>
            </span>
            Ask Paulie
          </h2>
        </div>
        
        <div className="h-[calc(100%-60px)]">
          <ChatInterface />
        </div>
      </div>
    </PageContainer>
  );
};

export default Chatbot;
