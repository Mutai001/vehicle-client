import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserHeader from './UserHeader';
import Footer from '../Common/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PbJox2KMNFPNnEGF0rcBxjD8rRZCyPhy7tOlnDDQUerAnMSstet7bBcg0mgZrXrUhprYbDSbA4Bnm37F1fIsuJn00NUmJnlOy');

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
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  amount: number;
  booking_status: string;
}

const BookVehicle: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [specifications, setSpecifications] = useState<VehicleSpecification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/vehicles');
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
        const response = await fetch('http://localhost:8000/api/vehicle-specifications');
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

  const handleBooking = async (vehicle: Vehicle) => {
    if (!vehicle.availability) {
      alert(`Vehicle with ID ${vehicle.vehicle_id} is not available.`);
      return;
    }
    setSelectedVehicle(vehicle);
  };

  const completeBooking = async (vehicle: Vehicle) => {
    const bookingData: BookingData = {
      user_id: 1,
      vehicle_id: vehicle.vehicle_id,
      location_id: 1,
      booking_date: new Date().toISOString().split('T')[0],
      return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: parseInt(vehicle.rental_rate) * 100,
      booking_status: 'Confirmed',
    };

    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
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
      return data.booking_id;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
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
      <UserHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      }} isSidebarCollapsed={false} />
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
                        <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicle_id}</h3>
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

            {selectedVehicle && (
              <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <Elements stripe={stripePromise}>
                  <PaymentForm vehicle={selectedVehicle} completeBooking={completeBooking} />
                </Elements>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface PaymentFormProps {
  vehicle: Vehicle;
  completeBooking: (vehicle: Vehicle) => Promise<number | void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ vehicle, completeBooking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const booking_id = await completeBooking(vehicle);

      if (!booking_id) {
        throw new Error('Booking failed');
      }

      // Call the payment API to create a payment intent
      const paymentResponse = await fetch('http://localhost:8000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseInt(vehicle.rental_rate) * 100, booking_id }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentData = await paymentResponse.json();

      // Confirm the payment with Stripe
      const { error } = await stripe.confirmCardPayment(paymentData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      alert('Payment successful');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default BookVehicle;
