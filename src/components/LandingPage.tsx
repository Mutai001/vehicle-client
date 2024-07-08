import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Common/Footer';
import CarImage from '../assets/images/hero-image.png'; // Example image import
import OnlineSVG from '../assets/online.svg'; // Example SVG import
import ServicesSVG from '../assets/services.svg'; // Example SVG import
import ContactSVG from '../assets/contact.svg'; // Example SVG import
import GetInTouchSVG from '../assets/get-in-touch.svg'; // Example SVG import
import HeroImage from '../assets/images/Car1.png'; // Example hero image import

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">🚗 Vehicle Rental Services</div>
          <nav className="space-x-4">
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/register" className="text-white hover:underline">Register</Link>
            <Link to="/admin" className="text-white hover:underline">Admin</Link>
            <Link to="/user" className="text-white hover:underline">User</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="bg-cover bg-center h-96 flex items-center" style={{ backgroundImage: `url(${HeroImage})` }}>
          <div className="container mx-auto text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Vehicle Rental Management System</h1>
            <p className="text-2xl mb-8">Your ultimate destination for renting vehicles</p>
            <Link to="/user" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-xl">Get Started</Link>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto py-8 px-4">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-4">Book Your Vehicle</h2>
                  <p className="text-lg text-gray-800">
                    Find and book your desired vehicle with ease. Our platform provides a wide selection of vehicles to suit your needs.
                  </p>
                  <Link to="/user" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Get Started</Link>
                </div>
                <img src={CarImage} alt="Car" className="md:ml-8 max-w-xs md:max-w-none" style={{ maxWidth: '250px' }} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <img src={OnlineSVG} alt="Online Booking" className="md:mr-8 max-w-xs md:max-w-none" style={{ maxWidth: '250px' }} />
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-4">Online Booking System</h2>
                  <p className="text-lg text-gray-800">
                    Manage your bookings online from anywhere, anytime. Our intuitive system ensures seamless booking experiences.
                  </p>
                  <Link to="/user" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Learn More</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src={ServicesSVG} alt="Our Services" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '250px' }} />
              <h2 className="text-4xl font-bold mb-4 text-center">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Vehicle Selection</h3>
                  <p className="text-gray-800">
                    Browse a wide range of vehicles categorized by type, make, and model. We offer vehicles suitable for every occasion.
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Booking System</h3>
                  <p className="text-gray-800">
                    Easily book vehicles based on your preferences and schedule. Our flexible booking system adapts to your needs.
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Customer Support</h3>
                  <p className="text-gray-800">
                    Access dedicated customer support for any inquiries or assistance needed. We are here to help you 24/7.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src={ContactSVG} alt="Contact Us" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '250px' }} />
              <h2 className="text-4xl font-bold mb-4 text-center">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Location</h3>
                  <p className="text-gray-800">
                    Visit us at 123 Vehicle Rental Street, City, Country. We are conveniently located to serve you better.
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Email</h3>
                  <p className="text-gray-800">
                    Reach out to us via email at info@vehiclerental.com. We respond promptly to all inquiries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src={GetInTouchSVG} alt="Get In Touch" className="mb-6 mx-auto max-w-xs md:max-w-none" style={{ maxWidth: '250px' }} />
              <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
              <p className="text-lg text-gray-800 text-center">
                Have questions or need assistance? We're here to help. Contact us for personalized assistance.
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
