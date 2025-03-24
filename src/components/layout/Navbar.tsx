
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-md w-96 px-3 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
