// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import LoginPage from './pages/Login';
// import RegisterPage from './pages/Register';
// import HomePage from './pages/Home';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/user" element={<UserDashboard />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
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
