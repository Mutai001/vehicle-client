import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      {/* Navigation Links */}
      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <span className="material-icons">dashboard</span>
              <span className="ml-2">Admin Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/user" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <span className="material-icons">person</span>
              <span className="ml-2">User Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/vehicles" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <span className="material-icons">directions_car</span>
              <span className="ml-2">Manage Vehicles</span>
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <span className="material-icons">book</span>
              <span className="ml-2">Manage Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <span className="material-icons">settings</span>
              <span className="ml-2">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Footer Section */}
      <div className="pt-4 border-t border-gray-600">
        <Link to="/logout" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
          <span className="material-icons">logout</span>
          <span className="ml-2">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
