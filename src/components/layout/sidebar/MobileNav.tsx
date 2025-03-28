
import React, { useState } from 'react';
import { NavSection } from './types';
import NavItems from './NavItems';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  sections: NavSection[];
}

const MobileNav: React.FC<MobileNavProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-2 text-gray-400 hover:text-white"
        onClick={toggleMenu}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={closeMenu}
              >
                <X size={24} />
              </Button>
            </div>
            <div className="p-4">
              <NavItems sections={sections} onItemClick={closeMenu} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
