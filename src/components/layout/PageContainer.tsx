
import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const PageContainer = ({ children, title, subtitle }: PageContainerProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {(title || subtitle) && (
        <div className="mb-6 p-4 md:p-6 animate-fade-in">
          {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="page-transition p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
