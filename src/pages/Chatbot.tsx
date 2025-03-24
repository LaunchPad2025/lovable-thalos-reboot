
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatInterface from '@/components/chatbot/ChatInterface';
import PageTitle from '@/components/ui/PageTitle';

const Chatbot = () => {
  return (
    <PageContainer>
      <PageTitle 
        title="Ask Paulie"
        subtitle="Your AI workplace safety assistant"
      />
      
      <div className="h-[calc(100vh-12rem)]">
        <ChatInterface />
      </div>
    </PageContainer>
  );
};

export default Chatbot;
