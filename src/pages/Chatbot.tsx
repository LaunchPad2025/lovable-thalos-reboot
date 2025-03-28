
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatInterface from '@/components/chatbot/ChatInterface';

const Chatbot = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Chat with Paulie</h1>
        <p className="text-gray-400">Ask questions about workplace safety regulations, compliance, and get personalized guidance.</p>
      </div>
      
      <div className="h-[calc(100vh-12rem)] bg-[#0d1117] border border-gray-800 rounded-lg p-4">
        <ChatInterface />
      </div>
    </PageContainer>
  );
};

export default Chatbot;
