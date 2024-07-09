import React from 'react';
import Sidebar from './Sidebar';


const BookVehicle: React.FC = () => {
  const vehicles = [
    {
      id: 1,
      vehicleName: 'Toyota Camry',
      type: 'Sedan',
      price: 80,
      available: true,
    },
    {
      id: 2,
      vehicleName: 'Honda CR-V',
      type: 'SUV',
      price: 100,
      available: false,
    },
    {
      id: 3,
      vehicleName: 'Ford Mustang',
      type: 'Sports Car',
      price: 120,
      available: true,
    },
    // Add more vehicles as needed
  ];

  // Function to handle booking of a vehicle
  const handleBooking = (id: number) => {
    // Implement booking logic here (e.g., update database, show confirmation, etc.)
    alert(`Vehicle with ID ${id} has been booked.`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 min-h-screen">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Book a Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className={`bg-gray-200 p-4 rounded-lg shadow-md ${!vehicle.available ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicleName}</h3>
                    <span className={`text-sm font-semibold ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                      {vehicle.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{vehicle.type}</p>
                  <p className="text-sm text-gray-600">Price per day: ${vehicle.price}</p>
                  {vehicle.available && (
                    <button
                      onClick={() => handleBooking(vehicle.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookVehicle;
