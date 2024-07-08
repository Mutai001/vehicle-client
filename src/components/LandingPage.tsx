import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Common/Footer';
import CarImage from '../assets/cars1.jpg'; // Example image import

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">🚗Vehicle Rental Services</div>
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

          {/* Welcome Section */}
          <section className="mb-12">
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
          </section>

          {/* Services Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Vehicle Selection</h3>
                <p className="text-gray-800">
                  Browse a wide range of vehicles categorized by type, make, and model.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Booking System</h3>
                <p className="text-gray-800">
                  Easily book vehicles based on your preferences and schedule.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                <p className="text-gray-800">
                  Access dedicated customer support for any inquiries or assistance needed.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-800">
                  123 Vehicle Rental Street, City, Country
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-800">
                  info@vehiclerental.com
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-800">
                  To provide reliable and convenient vehicle rental services with a focus on customer satisfaction.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-800">
                  To become the leading vehicle rental platform known for its user-friendly experience and diverse vehicle options.
                </p>
              </div>
            </div>
          </section>

        </main>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
