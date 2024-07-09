import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpeg';

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
      </Link>
      <nav className="space-x-4">
        <Link to="/user/book-vehicle" className="text-white hover:underline">Book a Vehicle</Link>
        <Link to="/user/booked-vehicles" className="text-white hover:underline">Booked Vehicles</Link>
        <Link to="/user/my-tickets" className="text-white hover:underline">My Tickets</Link>
        <Link to="/user/new-ticket" className="text-white hover:underline">New Ticket</Link>
        <Link to="/logout" className="text-white hover:underline">Logout</Link>
      </nav>
    </header>
  );
};

export default Navbar;
