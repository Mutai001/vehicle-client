import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

interface Booking {
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
  vehicleName: string;
  type: string;
  price: number;
  available: boolean;
}

const BookVehicle: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
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

    fetchBookings();
  }, []);

  // Function to handle booking of a vehicle
  const handleBooking = (id: number) => {
    // Implement booking logic here (e.g., update database, show confirmation, etc.)
    alert(`Vehicle with ID ${id} has been booked.`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 min-h-screen">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Book a Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map(booking => (
                <div key={booking.booking_id} className={`bg-gray-200 p-4 rounded-lg shadow-md ${booking.booking_status !== 'Available' ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{booking.vehicleName}</h3>
                    <span className={`text-sm font-semibold ${booking.booking_status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                      {booking.booking_status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Type: {booking.type}</p>
                  <p className="text-sm text-gray-600">Price per day: ${booking.price}</p>
                  <p className="text-sm text-gray-600">Booking Date: {booking.booking_date}</p>
                  <p className="text-sm text-gray-600">Return Date: {booking.return_date}</p>
                  <p className="text-sm text-gray-600">Total Amount: ${booking.total_amount}</p>
                  <p className="text-sm text-gray-600">Created At: {new Date(booking.created_at).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Updated At: {new Date(booking.updated_at).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Location ID: {booking.location_id}</p>
                  <p className="text-sm text-gray-600">User ID: {booking.user_id}</p>
                  {booking.booking_status === 'Available' && (
                    <button
                      onClick={() => handleBooking(booking.vehicle_id)}
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
