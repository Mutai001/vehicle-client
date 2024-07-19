import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-700 text-white flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <MenuIcon />
        </button>
      </div>
      <nav className="space-y-4">
        <Link to="/user/dashboard" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <DashboardIcon />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/user/book-vehicle" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <DirectionsCarIcon />
          {!isCollapsed && <span>Book a Vehicle</span>}
        </Link>
        <Link to="/user/booked-vehicles" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <BookmarksIcon />
          {!isCollapsed && <span>Booked Vehicles</span>}
        </Link>
        <Link to="/user/my-tickets" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <ConfirmationNumberIcon />
          {!isCollapsed && <span>My Tickets</span>}
        </Link>
        <Link to="/user/new-ticket" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <AddCircleOutlineIcon />
          {!isCollapsed && <span>New Ticket</span>}
        </Link>
        <Link to="/user/payments" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <PaymentIcon />
          {!isCollapsed && <span>Payments</span>}
        </Link>
      </nav>
      <div className="mt-auto border-t border-gray-600">
        <Link to="/logout" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <LogoutIcon />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
