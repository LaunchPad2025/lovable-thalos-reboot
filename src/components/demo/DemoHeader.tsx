
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DemoHeader = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-[#131820] border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold">Safety Compliance Demo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Bell className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only">Notifications</span>
          </Button>
          <Button variant="default" size="sm" onClick={() => navigate('/')}>
            Exit Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
