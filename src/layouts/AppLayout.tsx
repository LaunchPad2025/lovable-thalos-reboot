
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { AuthProvider } from '@/context/auth';

const AppLayout: React.FC = () => {
    return (
        <AuthProvider>
            <Sidebar>
                <Outlet />
            </Sidebar>
        </AuthProvider>
    );
};

export default AppLayout;
