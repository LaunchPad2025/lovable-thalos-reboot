
import React from 'react';
import { Bell, Search, Info, LogOut, Settings, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { mode, setMode } = useTheme();
  const { isDark } = useThemeStyles();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 hidden md:flex flex-col">
            <h2 className="text-xl font-bold text-foreground">
              Thalos
              <span className="text-primary text-opacity-80">.</span>
            </h2>
            <p className="text-xs text-muted-foreground">powered by Steel Toe</p>
          </div>
          <div className="flex items-center bg-muted rounded-md w-full max-w-sm px-3 py-2">
            <Search size={18} className="text-muted-foreground mr-2" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <SunMoon size={20} />
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex"
            onClick={() => window.location.href = "https://cal.com/thalos-sales/30min"}
          >
            Contact Sales
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-muted-foreground/30 text-foreground hover:bg-muted hidden md:flex"
            onClick={() => navigate('/legal')}
          >
            <Info size={16} className="mr-1" />
            Legal Docs
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-card"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full h-8 w-8 border border-border"
                aria-label="User menu"
              >
                <span className="font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user?.user_metadata?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => navigate('/legal')}
              >
                <Info className="mr-2 h-4 w-4" />
                <span>Legal & Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
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
