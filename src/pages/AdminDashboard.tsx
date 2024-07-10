import React from 'react';
import Sidebar from '../components/Admin/sidebar';
// import AdminDashboardContent from '../components/Admin/Dashboard';
import AdminOverview from '../components/Admin/AdminOverview'

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* <AdminDashboardContent /> */}
      <AdminOverview/>
    </div>
  );
};

export default AdminDashboard;
