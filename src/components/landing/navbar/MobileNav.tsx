
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Construction, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Oil } from '@/components/ui/icons/Oil';
import { Pickaxe } from '@/components/ui/icons/Pickaxe';
import { BatteryCharging } from '@/components/ui/icons/BatteryCharging';
import { industriesData } from '../IndustriesMenuList';
import { MobileNavProps } from './types';

// Map of industry icons by title
const industryIcons: Record<string, React.ReactNode> = {
  "Construction": <Construction className="h-4 w-4 inline mr-2" />,
  "Mining": <Pickaxe className="h-4 w-4 inline mr-2" />,
  "Oil & Gas": <Oil className="h-4 w-4 inline mr-2" />,
  "Manufacturing": <Factory className="h-4 w-4 inline mr-2" />,
  "Energy & Utilities": <BatteryCharging className="h-4 w-4 inline mr-2" />
};

const MobileNav = ({ isMenuOpen }: MobileNavProps) => {
  const handleScheduleCall = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  if (!isMenuOpen) return null;
  
  return (
    <div 
      id="mobile-menu"
      className="mt-4 flex flex-col space-y-4 md:hidden pb-4 animate-fade-in"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <Link to="/industries" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Industries</Link>
      
      {industriesData.map((industry, index) => (
        <Link 
          key={index}
          to={industry.href} 
          className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm"
        >
          {industryIcons[industry.title]} {industry.title}
        </Link>
      ))}
      
      <Link to="/documentation/features" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Features</Link>
      <Link to="/documentation/pricing" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Pricing</Link>
      <Link to="/documentation/contact" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Contact</Link>
      <Link to="/dashboard" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Dashboard</Link>
      <div className="flex flex-col space-y-2 pt-2">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 justify-center w-full"
          onClick={handleScheduleCall}
        >
          <Calendar className="mr-2 h-4 w-4" aria-hidden="true" /> Book a Setup Call
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
