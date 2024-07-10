import React from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vehicle Rental Management System</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <Link to="/admin" className="text-white hover:underline">Admin Dashboard</Link>
            <Link to="/user" className="text-white hover:underline">User Dashboard</Link>
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/register" className="text-white hover:underline">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <p className="text-gray-900">John Doe</p>
            </div>
            <div>
              <label className="block text-gray-600">Email Address</label>
              <p className="text-gray-900">john.doe@example.com</p>
            </div>
            {/* Add more profile details as needed */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-300 text-gray-600 text-center py-4">
        <p>&copy; 2024 Vehicle Rental Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
