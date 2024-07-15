import React from 'react';
import AdminSidebar from './sidebar';

const Settings: React.FC = () => {
  return (
    <>
        <div className="flex">

    <AdminSidebar />
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          {/* Example setting options */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name:</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // Add value and onChange handlers as needed
            />
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone:</label>
            <select
              id="timezone"
              name="timezone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // Add value and onChange handlers as needed
            >
              <option value="GMT-8">GMT-8 (Pacific Time)</option>
              <option value="GMT-5">GMT-5 (Eastern Time)</option>
              {/* Add more timezone options as needed */}
            </select>
          </div>
          {/* Add more settings options as necessary */}
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // Add onClick handler for saving settings
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default Settings;
