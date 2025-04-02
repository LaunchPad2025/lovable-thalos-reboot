
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { IndustryItemProps } from './navbar/types';

export const IndustryItem = ({ title, description, href }: IndustryItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/20 hover:text-white focus:bg-blue-900/20 focus:text-white"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default IndustryItem;
