import React from 'react';
import { Link } from 'react-router-dom';

const NewTicketLink: React.FC = () => {
  return (
    <Link to="/user/new-ticket" className="text-white hover:underline">
      New Ticket
    </Link>
  );
};

export default NewTicketLink;
