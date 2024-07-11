import React from 'react';

const FleetManagement: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Fleet Management</h2>
      <img src="path/to/fleet-image.jpg" alt="Fleet Management" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700">View and manage fleet details, including acquisition and maintenance.</p>
    </div>
  );
};

export default FleetManagement;
