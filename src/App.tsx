import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import BookVehicle from './components/Customer/BookVehicle';
import BookedVehicles from './components/Customer/BookedVehicles';
import MyTickets from './components/Customer/MyTickets';
import NewTicket from './components/Customer/NewTicket';
import LogoutLink from './components/Customer/Logout';
// import NotFound from './pages/NotFound';
import PaymentPage from './components/Customer/Payment';
import FleetManagement from './components/Admin/FleetManagement';
import ManageVehicles from './components/Admin/ManageVehicles';
import ManageUsers from './components/Admin/ManageUsers';
import Reports from './components/Admin/Reports';
import Settings from './components/Admin/Settings';
import SupportTickets from './components/Admin/SupportTickets';
import LocationsAndBranches from './components/Admin/LocationsAndBranches';

const App: React.FC = () => {
  return (
    <Routes>
       <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/logout" element={<LogoutLink />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/notfound" Component={NotFound} />
        <Route path="/user/payment" Component={PaymentPage} />
        <Route path="/user/dashboard" Component={UserDashboard} />
        <Route path="/user/book-vehicle" Component={BookVehicle} />
        <Route path="/user/booked-vehicles" Component={BookedVehicles} />
        <Route path="/user/my-tickets" Component={MyTickets} />
        <Route path="/user/new-ticket" Component={NewTicket} />
        <Route path="/admin/dashboard" Component={AdminDashboard} />
        <Route path="/admin/manage-vehicles" Component={ManageVehicles} />
        <Route path="/admin/manage-users" Component={ManageUsers} />
        <Route path="/admin/assessment-reports" Component={Reports} />
        <Route path="/admin/manage-fleet" Component={FleetManagement} />
        <Route path="/admin/locations-branches" Component={LocationsAndBranches} />
        <Route path="/admin/support-tickets" Component={SupportTickets} />
        <Route path="/admin/settings" Component={Settings} />
    </Routes>
  );
};

const NotFound: React.FC = () => (
  <div>
    <h2>404 Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;