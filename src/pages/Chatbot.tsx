
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatInterface from '@/components/chatbot/ChatInterface';

const Chatbot = () => {
  return (
    <PageContainer>
      <div className="h-[calc(100vh-8rem)]">
        <ChatInterface />
      </div>
    </PageContainer>
  );
};

export default Chatbot;
