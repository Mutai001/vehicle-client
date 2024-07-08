import React from 'react';
import Navbar from '../Common/Navbar'; // Adjust the import path as necessary
import Sidebar from '../Common/Sidebar'; // Adjust the import path as necessary
import AdminOverview from './AdminOverview'; // New component
import ManageVehicles from './ManageVehicles'; // New component
import ManageUsers from './ManageUsers'; // New component
import Reports from './Reports'; // New component
import LocationsAndBranches from './LocationsBranches'; // New component
import SupportTickets from './SupportTickets'; // New component
import FleetManagement from './FleetManagement'; // New component

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-grow bg-gray-100">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
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
  );
};

export default AdminDashboard;
