
import React from 'react';
import { Bell, Search, Info, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-[#0d1117] border-b border-gray-800 sticky top-0 z-10">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 hidden md:flex flex-col">
            <h2 className="text-xl font-bold text-white">Thalos</h2>
            <p className="text-xs text-gray-400">powered by Steel Toe</p>
          </div>
          <div className="flex items-center bg-[#161b22] rounded-md w-full max-w-sm px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-sm text-gray-300"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white border-none hidden md:flex"
            onClick={() => navigate('/subscription')}
          >
            Upgrade Plan
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hidden md:flex"
          >
            <Info size={16} className="mr-1" />
            Start Tour
          </Button>
          
          <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-[#1f2937]">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-[#0d1117]"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full h-8 w-8 border border-gray-700">
                <span className="font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#161b22] border-gray-700 text-gray-200" align="end">
              <div className="flex items-center justify-start p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user?.user_metadata?.name || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-700"
                onClick={() => navigate('/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
