
import React from 'react';
import { useLocation } from 'react-router-dom';

const AppLayout: React.FC = ({ children }) => {
  const location = useLocation();
  
  // Don't show sidebar on the landing page or public routes
  const isPublicRoute = location.pathname === '/' || 
                         location.pathname.includes('/auth') || 
                         location.pathname.includes('/documentation') ||
                         location.pathname === '/legal' ||
                         location.pathname === '/onboarding' ||
                         location.pathname === '/demo';
  
  return (
    <div className="app-layout">
      {!isPublicRoute && (
        <aside className="sidebar">
          {/* Sidebar content */}
        </aside>
      )}
      <main className={`content ${isPublicRoute ? 'w-full' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
