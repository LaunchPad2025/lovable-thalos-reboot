
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const PageContainer = ({ children, title, subtitle }: PageContainerProps) => {
  return (
    <div className="flex flex-col h-screen bg-[#0b0f14] overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {(title || subtitle) && (
          <div className="mb-6 animate-fade-in">
            {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
            {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          </div>
        )}
        <div className="page-transition">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
