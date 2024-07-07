import React from 'react';
import Sidebar from '../components/Common/Sidebar';
import UserDashboardContent from '../components/Customer/Dashboard';

const UserDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <UserDashboardContent />
    </div>
  );
};

export default UserDashboard;
