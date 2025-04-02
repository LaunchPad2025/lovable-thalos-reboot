
import React, { ReactNode } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useMobile } from '@/hooks/useMobile';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  fullWidth?: boolean;
  hideNavigation?: boolean;
}

const PageContainer = ({ 
  children, 
  title, 
  subtitle, 
  className, 
  fullWidth, 
  hideNavigation = false 
}: PageContainerProps) => {
  const { sidebarCollapsed } = useTheme();
  const isMobile = useMobile();
  
  return (
    <div className={`flex-1 overflow-y-auto bg-background flex flex-col min-h-screen relative ${fullWidth ? 'w-full' : ''} ${className || ''}`}>
      {!hideNavigation && <NavigationHeader />}
      
      {(title || subtitle) && (
        <div className="mb-4 md:mb-6 p-4 md:p-6 animate-fade-in">
          {title && <h1 className="text-xl md:text-2xl font-bold text-foreground">{title}</h1>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="page-transition p-4 md:p-6 pb-20 flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
