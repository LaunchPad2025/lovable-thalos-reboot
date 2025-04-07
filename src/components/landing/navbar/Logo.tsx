
import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';

const Logo = () => {
  const isMobile = useMobile();
  
  return (
    <Link to="/" className="flex items-center group transition-all duration-300">
      <div className="flex items-center">
        <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
          Thalos<span className="text-blue-500">.</span>
        </span>
        <HardHat size={isMobile ? 18 : 20} className="text-blue-500 ml-1" aria-hidden="true" />
      </div>
      <span className="sr-only">Thalos - Workplace Safety Compliance</span>
    </Link>
  );
};

export default Logo;
