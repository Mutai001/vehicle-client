import React from 'react';
import UserImage from '../../assets/images/user-icon.png';

const UserProfile: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-grow bg-gray-100">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-96">
            <div className="flex items-center space-x-4">
              <img src={UserImage} alt="User" className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Cyrus Kimutai</h2>
                <p className="text-sm text-gray-600">cyruskimtai@gmail.com</p>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Information</h3>
              <div className="grid grid-cols-2 gap-x-4">
                <p className="text-sm text-gray-600">Full Name:</p>
                <p className="text-sm text-gray-800">Cyrus Kimutai</p>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="text-sm text-gray-800">cyruskimtai@gmail.com</p>
                {/* Add more profile data here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
