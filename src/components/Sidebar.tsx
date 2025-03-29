
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar hidden">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
