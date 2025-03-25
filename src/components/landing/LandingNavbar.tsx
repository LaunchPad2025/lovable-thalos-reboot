
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import IndustryItem from './IndustriesMenu';

const LandingNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <div>
            <span className="text-xl font-bold">Thalos</span>
            <span className="text-xs text-gray-400 block">powered by Steel Toe</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#features" className="text-gray-300 hover:text-white">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
          <a href="/documentation/pricing" className="text-gray-300 hover:text-white">Pricing</a>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-300 hover:text-white bg-transparent">Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/50 to-blue-900/60 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <Shield className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Industry-Specific Safety
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Explore safety solutions tailored to your industry needs and regulatory requirements.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <IndustryItem 
                      href="#" 
                      title="Construction" 
                      description="OSHA compliance and hazard prevention for construction sites" 
                    />
                    <IndustryItem 
                      href="#" 
                      title="Manufacturing" 
                      description="Machine safety, PPE requirements, and chemical handling" 
                    />
                    <IndustryItem 
                      href="#" 
                      title="Healthcare" 
                      description="Infection control, patient handling, and biohazard management" 
                    />
                    <IndustryItem 
                      href="#" 
                      title="Logistics" 
                      description="Transportation safety, materials handling, and warehouse compliance" 
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/auth')} className="text-gray-300 hover:text-white">
            Sign In
          </button>
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
