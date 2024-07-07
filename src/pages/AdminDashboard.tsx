import React from 'react';
import Sidebar from '../components/Common/Sidebar';
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
