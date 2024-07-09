import React from 'react';
import Sidebar from './Sidebar';
// import VehicleIcon from '../../assets/images/vehicle-icon.png'; // Replace with your vehicle icon

const BookedVehicles: React.FC = () => {
  // Sample data for booked vehicles
  const bookedVehicles = [
    {
      id: 1,
      vehicleName: 'Toyota Camry',
      bookingDate: '2024-07-09',
      returnDate: '2024-07-12',
      status: 'Active',
    },
    {
      id: 2,
      vehicleName: 'Honda Accord',
      bookingDate: '2024-07-08',
      returnDate: '2024-07-10',
      status: 'Returned',
    },
    // Add more booked vehicles as needed
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 min-h-screen">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Booked Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookedVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-4">
                  {/* <img src={VehicleIcon} alt="Vehicle Icon" className="w-12 h-12 rounded-full" /> */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{vehicle.vehicleName}</p>
                    <p className="text-sm text-gray-600">Booking Date: {vehicle.bookingDate}</p>
                    <p className="text-sm text-gray-600">Return Date: {vehicle.returnDate}</p>
                    <p className={`text-sm font-semibold ${vehicle.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                      Status: {vehicle.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookedVehicles;
