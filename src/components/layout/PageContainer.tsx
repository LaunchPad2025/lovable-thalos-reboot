
import React, { ReactNode } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useMobile } from '@/hooks/useMobile';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const PageContainer = ({ children, title, subtitle, className }: PageContainerProps) => {
  const { sidebarCollapsed } = useTheme();
  const isMobile = useMobile();
  
  return (
    <div className={`flex-1 overflow-y-auto bg-background ${className || ''}`}>
      {(title || subtitle) && (
        <div className="mb-6 p-4 md:p-6 animate-fade-in">
          {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="page-transition p-4 md:p-6 pb-20">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
