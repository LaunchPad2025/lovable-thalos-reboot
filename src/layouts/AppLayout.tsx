
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const AppLayout: React.FC = () => {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>
    );
};

export default AppLayout;
