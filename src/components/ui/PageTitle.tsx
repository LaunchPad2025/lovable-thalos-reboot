
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, subtitle, action, className }: PageTitleProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 animate-fade-in", className)}>
      <div>
        <h1 className="text-2xl font-bold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
};

export default PageTitle;
