import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-c.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="text-lg font-bold">Car Hire</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/FeaturedVehicles" className="hover:text-gray-400">Vehicles</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-400 focus:outline-none focus:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 py-2 bg-gray-800">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/vehicles" className="hover:text-gray-400">Vehicles</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
