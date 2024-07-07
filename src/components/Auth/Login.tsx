// LoginPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
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
      <main className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email Address</label>
              <input type="email" id="email" name="email" className="form-input mt-1 block w-full" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="form-input mt-1 block w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
       <footer className="bg-gray-300 text-gray-600 text-center py-4">
        <p>&copy; 2024 Vehicle Rental Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
