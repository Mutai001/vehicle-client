import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

interface Vehicle {
  vehicle_id: number;
  vehicleSpec_id: number | null;
  rental_rate: string;
  availability: boolean;
  vehicle_image: string;
  created_at: string;
  updated_at: string;
}

interface BookingData {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: string;
  booking_status: string;
}

interface PaymentData {
  booking_id: number;
  amount: string;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

const BookVehicle: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
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

    fetchVehicles();
  }, []);

  const handleBooking = async (vehicle: Vehicle) => {
    if (!vehicle.availability) {
      alert(`Vehicle with ID ${vehicle.vehicle_id} is not available.`);
      return;
    }

    // Set the selected vehicle to display the payment form
    setSelectedVehicle(vehicle);
  };

  const completeBooking = async (vehicle: Vehicle) => {
    const bookingData: BookingData = {
      user_id: 1, // Replace with actual user_id
      vehicle_id: vehicle.vehicle_id,
      location_id: 1, // Replace with actual location_id
      booking_date: new Date().toISOString().split('T')[0],
      return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Example return date one week later
      total_amount: vehicle.rental_rate,
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
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <main className="container mx-auto py-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Book a Vehicle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.vehicle_id}
                    className={`bg-gray-200 p-4 rounded-lg shadow-md ${
                      !vehicle.availability ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicle_image}</h3>
                      <span
                        className={`text-sm font-semibold ${
                          vehicle.availability ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {vehicle.availability ? 'Available' : 'Booked'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Price per day: ${vehicle.rental_rate}</p>
                    {vehicle.availability && (
                      <button
                        onClick={() => handleBooking(vehicle)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {selectedVehicle && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Complete Booking for {selectedVehicle.vehicle_image}
                  </h3>
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      vehicle={selectedVehicle}
                      completeBooking={completeBooking}
                    />
                  </Elements>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface PaymentFormProps {
  vehicle: Vehicle;
  completeBooking: (vehicle: Vehicle) => Promise<number | undefined>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ vehicle, completeBooking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(vehicle.rental_rate);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message || null);
        setIsLoading(false);
      } else if (paymentMethod) {
        const booking_id = await completeBooking(vehicle);

        if (booking_id) {
          const paymentData: PaymentData = {
            booking_id,
            amount,
            payment_status: 'Completed',
            payment_date: new Date().toISOString().split('T')[0],
            payment_method: 'Card',
            transaction_id: paymentMethod.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          try {
            const response = await fetch('http://localhost:8000/api/payments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
              throw new Error('Failed to process payment');
            }

            setIsSuccess(true);
            setErrorMessage(null);
          } catch (err) {
            if (err instanceof Error) {
              setErrorMessage(err.message);
            } else {
              setErrorMessage('An unknown error occurred');
            }
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 rounded-md mb-4" />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {isSuccess && <p className="text-green-500 mt-2">Payment successful!</p>}
    </form>
  );
};

export default BookVehicle;
