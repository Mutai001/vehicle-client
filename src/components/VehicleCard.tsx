import React from 'react';
import { Link } from 'react-router-dom';

interface Vehicle {
  id: number;
  imageUrl: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="h-60 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{`${vehicle.make} ${vehicle.model}`}</h3>
        <p className="text-gray-800 text-lg mb-4">{vehicle.year}</p>
        <p className="text-gray-600 mb-4">{vehicle.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-semibold">${vehicle.price} / day</p>
<Link to="/login">
  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
    Rent Now
  </button>
</Link>        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
