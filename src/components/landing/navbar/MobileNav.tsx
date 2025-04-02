
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ChevronRight, Construction, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Oil } from '@/components/ui/icons/Oil';
import { Pickaxe } from '@/components/ui/icons/Pickaxe';
import { BatteryCharging } from '@/components/ui/icons/BatteryCharging';

interface MobileNavProps {
  isMenuOpen: boolean;
}

const MobileNav = ({ isMenuOpen }: MobileNavProps) => {
  if (!isMenuOpen) return null;
  
  return (
    <div 
      id="mobile-menu"
      className="mt-4 flex flex-col space-y-4 md:hidden pb-4 animate-fade-in"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <Link to="/industries" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Industries</Link>
      <Link to="/industries/construction" className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm">
        <Construction className="h-4 w-4 inline mr-2" /> Construction
      </Link>
      <Link to="/industries/mining" className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm">
        <Pickaxe className="h-4 w-4 inline mr-2" /> Mining
      </Link>
      <Link to="/industries/oil-gas" className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm">
        <Oil className="h-4 w-4 inline mr-2" /> Oil & Gas
      </Link>
      <Link to="/industries/manufacturing" className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm">
        <Factory className="h-4 w-4 inline mr-2" /> Manufacturing
      </Link>
      <Link to="/industries/energy-utilities" className="text-gray-300 hover:text-white py-2 pl-4 border-b border-blue-900/20 text-sm">
        <BatteryCharging className="h-4 w-4 inline mr-2" /> Energy & Utilities
      </Link>
      <Link to="/documentation/features" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Features</Link>
      <Link to="/documentation/pricing" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Pricing</Link>
      <Link to="/documentation/contact" className="text-gray-300 hover:text-white py-2 border-b border-blue-900/20">Contact</Link>
      <div className="flex flex-col space-y-2 pt-2">
        <Button 
          variant="outline" 
          className="justify-center w-full"
          onClick={() => window.location.href = "https://thalostech.replit.app/auth"}
        >
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" /> Sign in
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 justify-center w-full"
          onClick={() => window.location.href = "https://thalostech.replit.app/auth"}
        >
          Get Started <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
