
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // In a real implementation, this would fetch different data
    toast({
      title: `${value === 'personal' ? 'Personal' : 'Organization'} dashboard selected`,
      description: "This would load different data in a production environment.",
      duration: 3000,
    });
  };

  const handleStartTour = () => {
    toast({
      title: "Dashboard Tour",
      description: "This would start an interactive tour of the dashboard features.",
      duration: 3000,
    });
  };
  
  const handleChatWithPaulie = () => {
    navigate('/chatbot');
  };

  return (
    <header className="bg-[#0d1117] border-b border-gray-800 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm">Overview of your safety compliance status</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-blue-900/20 hover:text-blue-300"
                onClick={handleChatWithPaulie}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat with Paulie
              </Button>
              <Button variant="outline" 
                className="border-gray-700 text-gray-300" 
                size="icon"
                onClick={handleStartTour}
              >
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Start Tour</span>
              </Button>
            </div>
          </div>
          
          <div className="flex mt-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2 bg-[#161b22]">
                <TabsTrigger value="personal" className="data-[state=active]:bg-[#1f2937]">
                  My Dashboard
                </TabsTrigger>
                <TabsTrigger value="organization" className="data-[state=active]:bg-[#1f2937]">
                  Organization
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
