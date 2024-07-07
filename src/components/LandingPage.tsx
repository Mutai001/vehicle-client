// HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Vehicle Rental Management System</div>
        <nav className="space-x-4">
          <Link to="/login" className="text-white hover:underline">Login</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
          <Link to="/admin" className="text-white hover:underline">Admin</Link>
          <Link to="/user" className="text-white hover:underline">User</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to the Vehicle Rental Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Book Your Vehicle</h2>
            <p className="text-lg text-gray-800">
              Find and book your desired vehicle with ease.
            </p>
            <Link to="/user" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Get Started</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p className="text-lg text-gray-800">
              Manage vehicles, users, bookings, and more.
            </p>
            <Link to="/admin" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Go to Admin Dashboard</Link>
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

export default HomePage;
