import React from 'react';
import { Link } from 'react-router-dom';

const BookVehicleLink: React.FC = () => {
  return (
    <Link to="/user/book-vehicle" className="text-white hover:underline">
      Book a Vehicle
    </Link>
  );
};

export default BookVehicleLink;
