import React from 'react';
import UserIcon from '../../assets/images/user-icon.png';
import { Link } from 'react-router-dom';
// import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const UserDashboard: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* <Navbar /> */}
        
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserIcon} alt="User Icon" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">User Dashboard</h1>
          </div>
          <nav className="space-x-4">
            <Link to="/user/book-vehicle" className="text-white hover:underline">Book a Vehicle</Link>
            <Link to="/user/booked-vehicles" className="text-white hover:underline">Booked Vehicles</Link>
            <Link to="/user/my-tickets" className="text-white hover:underline">My Tickets</Link>
            <Link to="/user/new-ticket" className="text-white hover:underline">New Ticket</Link>
            <Link to="/logout" className="text-white hover:underline">Logout</Link>
          </nav>
        </header>
        
        {/* Main Content */}
        <main className="container mx-auto py-8 px-4">
          {/* User information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>
            <p className="text-lg text-gray-800">Full Name: John Doe</p>
            <p className="text-lg text-gray-800">Email: john.doe@example.com</p>
            {/* Additional user details */}
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
};

export default UserDashboard;
