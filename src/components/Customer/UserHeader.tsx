// UserHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserHeader: React.FC<{ onToggleSidebar: () => void; isSidebarCollapsed: boolean }> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4">
      <button onClick={onToggleSidebar} className="text-white focus:outline-none md:hidden">
        <MenuIcon />
      </button>
      <div className="text-xl font-semibold">Vehicle Booking System</div>
      <div className="flex items-center space-x-4">
        <Link to="/user/profile" className="flex items-center">
          <AccountCircleIcon />
          {!isSidebarCollapsed && <span className="ml-2">Profile</span>}
        </Link>
      </div>
    </header>
  );
};

export default UserHeader;
