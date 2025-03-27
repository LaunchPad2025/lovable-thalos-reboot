
import React from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';

interface MobileAppLayoutProps {
  children: React.ReactNode;
}

const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({ children }) => {
  const { isMobileApp } = useMobileDetection();
  
  if (!isMobileApp) {
    return <>{children}</>;
  }
  
  return (
    <div className="mobile-app-container">
      <div className="mobile-app-status-bar h-6 bg-primary"></div>
      <div className="mobile-app-content">
        {children}
      </div>
      
      {/* Mobile-specific navigation or controls could be added here */}
      <div className="mobile-app-bottom-nav h-14 bg-card border-t border-border fixed bottom-0 left-0 right-0 flex items-center justify-around">
        {/* Mobile navigation icons would go here */}
      </div>
    </div>
  );
};

export default MobileAppLayout;
