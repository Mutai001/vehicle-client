// UserDashboard.tsx
import React from 'react';

const UserDashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <nav className="space-x-4">
            <a href="/" className="text-white hover:underline">Home</a>
            <a href="/admin" className="text-white hover:underline">Admin Dashboard</a>
            <a href="/user" className="text-white hover:underline">User Dashboard</a>
            <a href="/login" className="text-white hover:underline">Login</a>
            <a href="/register" className="text-white hover:underline">Register</a>
          </nav>
        </div>
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

      {/* Footer */}
      <footer className="bg-gray-300 text-gray-600 text-center py-4">
        <p>&copy; 2024 Vehicle Rental Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
