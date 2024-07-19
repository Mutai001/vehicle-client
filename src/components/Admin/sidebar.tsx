// AdminSidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportIcon from '@mui/icons-material/Support';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const AdminSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-800 text-white flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 h-screen`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <MenuIcon />
        </button>
      </div>
      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin/dashboard" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <DashboardIcon />
              {!isCollapsed && <span className="ml-2">Dashboard Overview</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-vehicles" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <DirectionsCarIcon />
              {!isCollapsed && <span className="ml-2">Manage Vehicles</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-users" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <PeopleIcon />
              {!isCollapsed && <span className="ml-2">Manage Users</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <AssessmentIcon />
              {!isCollapsed && <span className="ml-2">Reports</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/locations" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <LocationOnIcon />
              {!isCollapsed && <span className="ml-2">Location and Branches</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/support-tickets" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <SupportIcon />
              {!isCollapsed && <span className="ml-2">Customer Support Tickets</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/fleet-management" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <LocalShippingIcon />
              {!isCollapsed && <span className="ml-2">Fleet Management</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
              <SettingsIcon />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pt-4 border-t border-gray-600">
        <Link to="/logout" className="flex items-center px-4 py-2 rounded hover:bg-gray-700">
          <LogoutIcon />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
