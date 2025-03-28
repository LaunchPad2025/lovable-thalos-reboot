
import React from 'react';
import PageTitle from '@/components/ui/PageTitle';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className = '',
  title,
  subtitle
}) => {
  return (
    <div className={`container mx-auto px-4 md:px-6 ${className}`}>
      {title && (
        <PageTitle 
          title={title}
          subtitle={subtitle}
          className="mb-6"
        />
      )}
      {children}
    </div>
  );
};

export default PageContainer;
