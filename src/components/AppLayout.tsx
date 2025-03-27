import React from 'react';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        {/* Sidebar content */}
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
