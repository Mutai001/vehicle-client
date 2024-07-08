import React from 'react';
import Logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <img src={Logo} alt="logo" />
      <h1>Vehicle Rental Management System</h1>
    </header>
  );
};

export default Header;
