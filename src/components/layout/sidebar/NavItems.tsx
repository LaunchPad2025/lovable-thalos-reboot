
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavItem, NavSection } from './types';

interface NavItemsProps {
  sections: NavSection[];
  onItemClick?: () => void;
}

const NavItems: React.FC<NavItemsProps> = ({ sections, onItemClick }) => {
  const location = useLocation();
  
  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-2">
          {section.title && (
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {section.title}
            </h3>
          )}
          <nav className="space-y-1">
            {section.items.map((item, itemIndex) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={itemIndex}
                  to={item.path}
                  onClick={onItemClick}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3 h-5 w-5 text-gray-400">
                    <Icon />
                  </span>
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
};

export default NavItems;
