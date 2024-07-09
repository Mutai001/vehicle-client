// LoginPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const LoginPage: React.FC = () => {
  return (
    <>
    <div className="bg-gray-100 min-h-screen">
  
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email Address</label>
              <input type="email" id="email" name="email" className="form-input mt-1 block w-full bg-gray-300" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="form-input mt-1 block w-full  bg-gray-300" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </div>
      </main>

      </div>
    <Footer/>
    </>
  );
};

export default LoginPage;
