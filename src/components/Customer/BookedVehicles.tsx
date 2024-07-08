import React from 'react';
import { Link } from 'react-router-dom';

const BookedVehiclesLink: React.FC = () => {
  return (
    <Link to="/user/booked-vehicles" className="text-white hover:underline">
      Booked Vehicles
    </Link>
  );
};

export default BookedVehiclesLink;
