// // AdminDashboard.tsx
// import React from 'react';
// import Navbar from '../Common/Navbar';
// import Footer from '../Common/Footer';

// const AdminDashboard: React.FC = () => {
//   return (
//     <>
//     <div className="bg-gray-100 min-h-screen">
//            <Navbar />
//       {/* Main Content */}
//       <main className="container mx-auto py-8 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Dashboard widgets */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Total Bookings</h2>
//             <p className="text-lg text-gray-800">100</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Revenue Generated</h2>
//             <p className="text-lg text-gray-800">$10,000</p>
//           </div>
//         </div>
//       </main>
//     </div>
//         <Footer/>
//     </>
//   );
// };

// export default AdminDashboard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpeg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <img src={Logo} alt="Cye Vehicles" className="w-8 h-8" />
          <span>Cye Vehicles</span>
        </Link>

        {/* Links Section */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <Link to="/register" className="hover:text-gray-400">Register</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/vehicles" className="hover:text-gray-400">Vehicles</Link>
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
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <Link to="/register" className="hover:text-gray-400">Register</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/vehicles" className="hover:text-gray-400">Vehicles</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
