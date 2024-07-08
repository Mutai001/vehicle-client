import React from 'react';
import { Link } from 'react-router-dom';

const LogoutLink: React.FC = () => {
  return (
    <Link to="/logout" className="text-white hover:underline">
      Logout
    </Link>
  );
};

export default LogoutLink;
