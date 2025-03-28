
import React from 'react';
import { NavSection } from './types';
import NavItems from './NavItems';

interface DesktopNavProps {
  sections: NavSection[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ sections }) => {
  return (
    <div className="hidden md:block py-4">
      <NavItems sections={sections} />
    </div>
  );
};

export default DesktopNav;
