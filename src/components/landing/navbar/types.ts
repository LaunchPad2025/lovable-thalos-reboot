
export interface IndustryItemProps {
  title: string; 
  description: string; 
  href: string;
}

export interface NavigationItemProps {
  path: string;
  label: string;
  isActive: boolean;
}

export interface MobileNavProps {
  isMenuOpen: boolean;
}

export interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export interface DesktopNavProps {
  isActive: (path: string) => boolean;
}
