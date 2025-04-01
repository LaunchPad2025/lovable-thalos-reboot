
import React from 'react';
import { Bell, MessageSquare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DemoHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-[#0b0f14] border-b border-gray-800 z-20 flex items-center px-6">
      <div className="flex-1 flex items-center">
        <div className="relative w-72 mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-md bg-[#161b22] border border-gray-800 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <span className="text-xs px-2 py-1 rounded-md bg-blue-900/30 text-blue-400 border border-blue-800/30">Demo Mode</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800" size="icon">
          <Bell size={20} />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800" size="icon">
          <MessageSquare size={20} />
          <span className="sr-only">Messages</span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
          <User size={18} className="text-gray-300" />
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
