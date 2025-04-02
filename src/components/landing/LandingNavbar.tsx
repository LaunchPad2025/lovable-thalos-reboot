
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import MobileMenuToggle from './navbar/MobileMenuToggle';

const LandingNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  return (
    <header className={`w-full border-b border-blue-900/20 bg-[#0C1117] sticky top-0 z-50 ${scrolled ? 'shadow-md shadow-blue-900/10' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <DesktopNav isActive={isActive} />
          </div>
          
          <div className="flex items-center">
            <MobileMenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
        
        <MobileNav isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
};

export default LandingNavbar;
