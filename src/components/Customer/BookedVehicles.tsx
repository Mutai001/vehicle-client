import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sidebar from './Sidebar';
import UserHeader from './UserHeader';
import Footer from '../Common/Footer';

interface BookedVehicle {
  booking_id: number;
  vehicle_id: number;
  vehicle_model: string;
  booking_date: string;
  return_date: string;
  total_amount: string;
  booking_status: string;
}

const BookedVehicle: React.FC = () => {
  const [bookedVehicles, setBookedVehicles] = useState<BookedVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchBookedVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://vehicle-rental-db.azurewebsites.net//api/bookings'); // Adjust URL as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch booked vehicles');
        }
        const data = await response.json();
        setBookedVehicles(data);
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

    fetchBookedVehicles();
  }, []);

  const handleProceedToPayment = (vehicle_id: number, total_amount: string) => {
    navigate(`/user/payments?vehicle_id=${vehicle_id}&amount=${total_amount}`);
  };

  const handleCancelBooking = async (booking_id: number) => {
    try {
      const response = await fetch(`https://vehicle-rental-db.azurewebsites.net/api/bookings/${booking_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookedVehicles((prev) => prev.filter((booking) => booking.booking_id !== booking_id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to cancel booking.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to cancel booking.');
      } else {
        setError('Failed to cancel booking.');
      }
    }
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
              <h2 className="text-xl font-bold mb-4">My Booked Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookedVehicles.map((booking) => (
                  <div key={booking.booking_id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">{booking.vehicle_model}</h3>
                    <p className="text-sm text-gray-600">Booking Date: {booking.booking_date}</p>
                    <p className="text-sm text-gray-600">Return Date: {booking.return_date}</p>
                    <p className="text-sm text-gray-600">Total Amount: ${booking.total_amount}</p>
                    <p className="text-sm text-gray-600">Status: {booking.booking_status}</p>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-2 mr-2"
                      onClick={() => handleProceedToPayment(booking.vehicle_id, booking.total_amount)}
                    >
                      Proceed to Payment
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                      onClick={() => handleCancelBooking(booking.booking_id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookedVehicle;
