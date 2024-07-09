import React from 'react';
import UserProfile from './UserProfile';
// import Navbar from '../Common/Navbar';

const UserDashboard: React.FC = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="flex-grow bg-gray-100 p-4">
          <main className="container mx-auto py-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Profile Details:</h2>
              <p className="text-lg text-gray-800">Name:</p>
              <p className="text-lg text-gray-800">Email:</p>
            </div>
          </main>
        </div>
        <UserProfile/>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
