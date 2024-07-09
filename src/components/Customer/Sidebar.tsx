import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-700 text-white p-4 flex flex-col justify-between">
      <nav className="space-y-4">
        <Link to="/user/dashboard" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        <Link to="/user/book-vehicle" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <DirectionsCarIcon />
          <span>Book a Vehicle</span>
        </Link>
        <Link to="/user/booked-vehicles" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <BookmarksIcon />
          <span>Booked Vehicles</span>
        </Link>
        <Link to="/user/my-tickets" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <ConfirmationNumberIcon />
          <span>My Tickets</span>
        </Link>
        <Link to="/user/new-ticket" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <AddCircleOutlineIcon />
          <span>New Ticket</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/logout" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <LogoutIcon />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
