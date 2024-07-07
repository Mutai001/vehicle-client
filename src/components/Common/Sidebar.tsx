import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-700 text-white p-4">
      <nav>
        <ul>
          <li><Link to="/admin">Admin Dashboard</Link></li>
          <li><Link to="/user">User Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
