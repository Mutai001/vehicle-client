import React from 'react';
import { Link } from 'react-router-dom';

const MyTicketsLink: React.FC = () => {
  return (
    <Link to="/user/my-tickets" className="text-white hover:underline">
      My Tickets
    </Link>
  );
};

export default MyTicketsLink;
