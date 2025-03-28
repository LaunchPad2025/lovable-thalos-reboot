
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar w-64 bg-slate-900 text-white h-screen">
            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/dashboard" className={({isActive}) => 
                            isActive ? "block p-2 bg-blue-700 rounded" : "block p-2 hover:bg-slate-800 rounded"
                        }>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" className={({isActive}) => 
                            isActive ? "block p-2 bg-blue-700 rounded" : "block p-2 hover:bg-slate-800 rounded"
                        }>
                            Tasks
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
