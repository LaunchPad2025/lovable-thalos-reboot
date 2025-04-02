
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import IndustryItem from '../IndustriesMenu';

interface DesktopNavProps {
  isActive: (path: string) => boolean;
}

const DesktopNav = ({ isActive }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center gap-2">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`bg-transparent ${isActive('/industries') ? 'text-blue-400' : 'text-gray-300'} hover:text-white`}>
              Industries
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" role="menu">
                <IndustryItem
                  title="Construction"
                  href="/industries/construction"
                  description="Safety compliance and risk management for construction sites."
                />
                <IndustryItem
                  title="Mining"
                  href="/industries/mining"
                  description="Comprehensive safety solutions for underground and surface mining operations."
                />
                <IndustryItem
                  title="Oil & Gas"
                  href="/industries/oil-gas"
                  description="Safety compliance for drilling, refining, and distribution operations."
                />
                <IndustryItem
                  title="Manufacturing"
                  href="/industries/manufacturing"
                  description="Automated safety oversight for manufacturing facilities."
                />
                <IndustryItem
                  title="Energy & Utilities"
                  href="/industries/energy-utilities"
                  description="Specialized safety solutions for power generation and distribution."
                />
              </ul>
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
          onClick={() => window.location.href = "https://thalostech.replit.app/auth"}
        >
          Sign in
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 items-center"
          aria-label="Get started with Thalos"
          onClick={() => window.location.href = "https://thalostech.replit.app/auth"}
        >
          Get Started <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
