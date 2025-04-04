
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import IndustriesMenuList from '../IndustriesMenuList';
import { DesktopNavProps } from './types';

const DesktopNav = ({ isActive }: DesktopNavProps) => {
  const handleScheduleCall = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <div className="hidden md:flex items-center gap-2">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`bg-transparent ${isActive('/industries') ? 'text-blue-400' : 'text-gray-300'} hover:text-white`}>
              Industries
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <IndustriesMenuList />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/documentation/features" 
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${isActive('/documentation/features') ? 'text-blue-400' : 'text-gray-300'} hover:text-white`}
            >
              Features
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/documentation/pricing" 
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${isActive('/documentation/pricing') ? 'text-blue-400' : 'text-gray-300'} hover:text-white`}
            >
              Pricing
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/documentation/contact" 
              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${isActive('/documentation/contact') ? 'text-blue-400' : 'text-gray-300'} hover:text-white`}
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          className="text-gray-300 hover:text-white"
          aria-label="Sign in to your account"
          onClick={() => window.location.href = "https://thalostech.replit.app/api/auth"}
        >
          Sign in
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 items-center"
          aria-label="Book a 30-Minute Setup Call"
          onClick={handleScheduleCall}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book a Setup Call
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
