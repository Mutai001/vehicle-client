import React from 'react';

const ManageVehicles: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Manage Vehicles</h2>
      <img src="path/to/vehicle-image.jpg" alt="Manage Vehicles" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700">CRUD operations for adding, editing, and deleting vehicles.</p>
    </div>
  );
};

export default ManageVehicles;
