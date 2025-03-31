
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar hidden">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>Tasks</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
