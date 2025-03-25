
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import IndustryItem from './IndustriesMenu';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="w-full border-b border-blue-900/20 bg-[#0C1117]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Thalos</span>
              <span className="ml-1 text-blue-500">.</span>
            </Link>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white">Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <IndustryItem
                        title="Construction"
                        href="/industries/construction"
                        description="Safety compliance and risk management for construction sites."
                      />
                      <IndustryItem
                        title="Manufacturing"
                        href="/industries/manufacturing"
                        description="Automated safety oversight for manufacturing facilities."
                      />
                      <IndustryItem
                        title="Healthcare"
                        href="/industries/healthcare"
                        description="Compliance management for healthcare environments."
                      />
                      <IndustryItem
                        title="Logistics"
                        href="/industries/logistics"
                        description="Safety protocol management for logistics operations."
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/documentation/features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-300 hover:text-white">
                    Features
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/documentation/pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-300 hover:text-white">
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-gray-300 hover:text-white hidden md:flex"
            >
              Sign in
            </Button>
            <Button 
              onClick={() => navigate('/auth?signup=true')} 
              className="bg-blue-600 hover:bg-blue-700 hidden md:flex"
            >
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              className="md:hidden" 
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-4 md:hidden pb-4">
            <Link to="/industries" className="text-gray-300 hover:text-white">Industries</Link>
            <Link to="/documentation/features" className="text-gray-300 hover:text-white">Features</Link>
            <Link to="/documentation/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="justify-center w-full"
              >
                <LogIn className="mr-2 h-4 w-4" /> Sign in
              </Button>
              <Button 
                onClick={() => navigate('/auth?signup=true')} 
                className="bg-blue-600 hover:bg-blue-700 justify-center w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
