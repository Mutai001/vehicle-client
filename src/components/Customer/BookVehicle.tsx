import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Sidebar from './Sidebar';
import UserHeader from './UserHeader';
import Footer from '../Common/Footer';

interface Vehicle {
  vehicle_id: number;
  vehicleSpec_id: number | null;
  rental_rate: string;
  availability: boolean;
  vehicle_image: string;
  created_at: string;
  updated_at: string;
}

interface VehicleSpecification {
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

interface BookingData {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: string;
  booking_status: string;
  created_at: string;
  updated_at: string;
}

const BookVehicle: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [specifications, setSpecifications] = useState<VehicleSpecification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [numDays, setNumDays] = useState<number>(1); // New state for number of days
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchSpecifications = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/vehicle-specifications');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle specifications');
        }
        const data = await response.json();
        setSpecifications(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
    fetchSpecifications();
  }, []);

  const handleBooking = (vehicle: Vehicle) => {
    if (!vehicle.availability) {
      alert(`Vehicle with ID ${vehicle.vehicle_id} is not available.`);
      return;
    }
    setSelectedVehicle(vehicle);
    setShowConfirmModal(true);
  };

  const completeBooking = async () => {
    if (!selectedVehicle) return;

    const bookingData: BookingData = {
      booking_id: 0, // Placeholder, to be set by the backend
      user_id: 1, // Adjust as necessary
      vehicle_id: selectedVehicle.vehicle_id,
      location_id: 1, // Adjust as necessary
      booking_date: new Date().toISOString().split('T')[0],
      return_date: new Date(Date.now() + numDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total_amount: (parseInt(selectedVehicle.rental_rate) * numDays).toFixed(2),
      booking_status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      if (data.booking_id) {
        // Update the vehicle availability
        await fetch(`https://car-rental-backend-c5h2.onrender.com/api/vehicles/${selectedVehicle.vehicle_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ availability: false }),
        });

        navigate('/user/booked-vehicles'); // Redirect to booked vehicles page
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setShowConfirmModal(false);
      setSelectedVehicle(null);
      setNumDays(1); // Reset number of days
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setSelectedVehicle(null);
    setNumDays(1); // Reset number of days
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <UserHeader onToggleSidebar={() => { /* implement toggle sidebar logic */ }} isSidebarCollapsed={false} />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <main className="container mx-auto py-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Book a Vehicle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => {
                  const spec = specifications.find(spec => spec.vehicle_id === vehicle.vehicle_id);

                  return (
                    <div
                      key={vehicle.vehicle_id}
                      className={`bg-gray-200 p-4 rounded-lg shadow-md ${!vehicle.availability ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{spec?.manufacturer} {spec?.model}</h3>
                        <span
                          className={`text-sm font-semibold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {vehicle.availability ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <img src={vehicle.vehicle_image} alt={`Image of vehicle ${vehicle.vehicle_id}`} className="w-full h-32 object-cover rounded-md mb-2" />
                      <p className="text-sm text-gray-600">Price per day: ${vehicle.rental_rate}</p>

                      {spec && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Manufacturer: {spec.manufacturer}</p>
                          <p className="text-sm text-gray-600">Model: {spec.model}</p>
                          <p className="text-sm text-gray-600">Year: {spec.year}</p>
                          <p className="text-sm text-gray-600">Fuel Type: {spec.fuel_type}</p>
                          <p className="text-sm text-gray-600">Seating Capacity: {spec.seating_capacity}</p>
                        </div>
                      )}

                      {vehicle.availability && (
                        <button
                          onClick={() => handleBooking(vehicle)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>

      {showConfirmModal && selectedVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
            <p className="mb-4">Are you sure you want to book this vehicle?</p>
            <p><strong>Vehicle:</strong> {specifications.find(spec => spec.vehicle_id === selectedVehicle.vehicle_id)?.manufacturer} {specifications.find(spec => spec.vehicle_id === selectedVehicle.vehicle_id)?.model}</p>
            <p><strong>Price per day:</strong> ${selectedVehicle.rental_rate}</p>
            <div className="mb-4">
              <label htmlFor="numDays" className="block text-sm font-medium text-gray-700">Number of days:</label>
              <input
                type="number"
                id="numDays"
                value={numDays}
                onChange={(e) => setNumDays(parseInt(e.target.value))}
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p><strong>Total Amount:</strong> ${(parseInt(selectedVehicle.rental_rate) * numDays).toFixed(2)}</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={completeBooking} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BookVehicle;



