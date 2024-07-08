import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Common/Footer';
import CarImage from '../assets/images/Car1.png'; // Example image import
import OnlineSVG from '../assets/online.svg'; // Example SVG import
import ServicesSVG from '../assets/services.svg'; // Example SVG import
import ContactSVG from '../assets/contact.svg'; // Example SVG import
import GetInTouchSVG from '../assets/get-in-touch.svg'; // Example SVG import

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">🚗 Vehicle Rental Services</div>
          <nav className="space-x-4">
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/register" className="text-white hover:underline">Register</Link>
            <Link to="/admin" className="text-white hover:underline">Admin</Link>
            <Link to="/user" className="text-white hover:underline">User</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8 px-4">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Book Your Vehicle</h2>
                  <p className="text-lg text-gray-800">
                    Find and book your desired vehicle with ease.
                  </p>
                  <Link to="/user" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Get Started</Link>
                </div>
                <img src={CarImage} alt="Car" className="md:ml-8 max-w-xs md:max-w-none" style={{ maxWidth: '200px' }} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <img src={OnlineSVG} alt="Online Booking" className="md:mr-8 max-w-xs md:max-w-none" style={{ maxWidth: '200px' }} />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Online Booking System</h2>
                  <p className="text-lg text-gray-800">
                    Manage your bookings online from anywhere, anytime.
                  </p>
                  <Link to="/user" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Learn More</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={ServicesSVG} alt="Our Services" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '200px' }} />
                <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Vehicle Selection</h3>
                    <p className="text-gray-800">
                      Browse a wide range of vehicles categorized by type, make, and model.
                    </p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Booking System</h3>
                    <p className="text-gray-800">
                      Easily book vehicles based on your preferences and schedule.
                    </p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                    <p className="text-gray-800">
                      Access dedicated customer support for any inquiries or assistance needed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={ContactSVG} alt="Contact Us" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '200px' }} />
                <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Location</h3>
                    <p className="text-gray-800">
                      123 Vehicle Rental Street, City, Country
                    </p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-800">
                      info@vehiclerental.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src={GetInTouchSVG} alt="Get In Touch" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '200px' }} />
              <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
              <p className="text-lg text-gray-800 text-center">
                Have questions or need assistance? We're here to help.
              </p>
              <Link to="/contact" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Contact Us</Link>
            </div>
          </section>

        </main>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
