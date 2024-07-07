// HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Vehicle Rental Management System</div>
        <nav className="space-x-4">
          <Link to="/login" className="text-white hover:underline">Login</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
          <Link to="/admin" className="text-white hover:underline">Admin</Link>
          <Link to="/user" className="text-white hover:underline">User</Link>
        </nav>
      </header>
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Vehicle Rental Management System</h1>
        <p className="text-lg text-gray-800">
          Find and book your desired vehicle here.
        </p>
        {/* Additional content */}
      </main>
    </div>
  );
};

export default HomePage;
