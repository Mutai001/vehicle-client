import React from 'react';
import { Link } from 'react-router-dom';
// // import DashboardIcon from '../../assets/images/dashboard-icon.svg';
// // import BookVehicleIcon from '../../assets/images/book-vehicle-icon.svg';
// // import BookedVehiclesIcon from '../../assets/images/booked-vehicles-icon.svg';
// // import TicketsIcon from '../../assets/images/tickets-icon.svg';
// // import NewTicketIcon from '../../assets/images/new-ticket-icon.svg';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-700 text-white p-4 flex flex-col justify-between">
      <nav className="space-y-4">
        <Link to="/user/dashboard" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          {/* <img src={DashboardIcon} alt="Dashboard Icon" className="w-6 h-6" /> */}
          <span>Dashboard</span>
        </Link>
        <Link to="/user/book-vehicle" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          {/* <img src={BookVehicleIcon} alt="Book Vehicle Icon" className="w-6 h-6" /> */}
          <span>Book a Vehicle</span>
        </Link>
        <Link to="/user/booked-vehicles" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          {/* <img src={BookedVehiclesIcon} alt="Booked Vehicles Icon" className="w-6 h-6" /> */}
          <span>Booked Vehicles</span>
        </Link>
        <Link to="/user/my-tickets" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          {/* <img src={TicketsIcon} alt="Tickets Icon" className="w-6 h-6" /> */}
          <span>My Tickets</span>
        </Link>
        <Link to="/user/new-ticket" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          {/* <img src={NewTicketIcon} alt="New Ticket Icon" className="w-6 h-6" /> */}
          <span>New Ticket</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/logout" className="flex items-center space-x-2 text-white hover:bg-gray-600 p-2 rounded">
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
