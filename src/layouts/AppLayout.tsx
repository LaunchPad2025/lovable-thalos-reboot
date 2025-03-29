import React from 'react';
import Sidebar from '../components/Sidebar';

const AppLayout: React.FC = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
