import React from 'react';
import Sidebar from '../components/Admin/sidebar';
import AdminDashboardContent from '../components/Admin/Dashboard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <AdminDashboardContent />
    </div>
  );
};

export default AdminDashboard;
