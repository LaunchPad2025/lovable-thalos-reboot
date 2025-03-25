
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatInterface from '@/components/chatbot/ChatInterface';

const Chatbot = () => {
  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Paulie</h1>
        <p className="text-gray-400">Your AI assistant for safety regulations and compliance guidance</p>
      </div>
      
      <div className="h-[calc(100vh-12rem)]">
        <ChatInterface />
      </div>
    </PageContainer>
  );
};

export default Chatbot;
