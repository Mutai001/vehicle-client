import React from 'react';
import AdminOverview from './AdminOverview'; // New component
import ManageVehicles from './ManageVehicles'; // New component
import ManageUsers from './ManageUsers'; // New component
import Reports from './Reports'; // New component
import LocationsAndBranches from './LocationsAndBranches'; // New component
import SupportTickets from './SupportTickets'; // New component
import FleetManagement from './FleetManagement'; // New component

const AdminDashboard: React.FC = () => {
  return (
    <>
    <div className="flex min-h-screen mb-20px ">

      <div className="flex-grow bg-gray-100">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-green-800">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AdminOverview />
            <ManageVehicles />
            <ManageUsers />
            <Reports />
            <LocationsAndBranches />
            <SupportTickets />
            <FleetManagement />
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
