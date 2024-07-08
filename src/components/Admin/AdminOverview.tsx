import React from 'react';

const AdminOverview: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Dashboard Overview</h2>
      <img src="path/to/admin-image.jpg" alt="Admin Overview" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700">Summary of total bookings, revenue generated, and other key metrics using bar, scatter, or any other charts.</p>
    </div>
  );
};

export default AdminOverview;
