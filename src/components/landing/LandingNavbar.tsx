import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogIn, HardHat, Menu, X, ChevronRight } from "lucide-react";
import IndustryItem from './IndustriesMenu';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  return (
    <header className="w-full border-b border-blue-900/20 bg-[#0C1117] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center group transition-all duration-300">
              <span className="text-2xl font-bold text-white mr-0 group-hover:text-blue-400 transition-colors">Thalos<span className="text-blue-500">.</span></span>
              <HardHat size={20} className="text-blue-500 ml-1" aria-hidden="true" />
              <span className="sr-only">Thalos - Workplace Safety Compliance</span>
            </Link>
            
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
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-gray-300 hover:text-white hidden md:flex"
              aria-label="Sign in to your account"
            >
              Sign in
            </Button>
            <Button 
              onClick={() => navigate('/auth?signup=true')} 
              className="bg-blue-600 hover:bg-blue-700 hidden md:flex items-center"
              aria-label="Get started with Thalos"
            >
              Get Started <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="mt-4 flex flex-col space-y-4 md:hidden pb-4 animate-fade-in"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <Link to="/industries" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Industries</Link>
            <Link to="/documentation/features" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Features</Link>
            <Link to="/documentation/pricing" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Pricing</Link>
            <Link to="/documentation/contact" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Contact</Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="justify-center w-full"
              >
                <LogIn className="mr-2 h-4 w-4" aria-hidden="true" /> Sign in
              </Button>
              <Button 
                onClick={() => navigate('/auth?signup=true')} 
                className="bg-blue-600 hover:bg-blue-700 justify-center w-full"
              >
                Get Started <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
