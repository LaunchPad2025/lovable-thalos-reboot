
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuToggle = ({ isMenuOpen, toggleMenu }: MobileMenuToggleProps) => {
  return (
    <Button 
      variant="ghost" 
      className="md:hidden p-2" 
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
  );
};

export default MobileMenuToggle;
