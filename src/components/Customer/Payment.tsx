import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Sidebar from './Sidebar';
import Footer from '../Common/Footer';
import Header from '../Common/Header';

const stripePromise = loadStripe('your-stripe-public-key');

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
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
        const paymentData = {
          booking_id: 1, // Replace with actual booking_id
          amount: parseFloat(amount),
          payment_status: 'Pending',
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'Card',
          transaction_id: paymentMethod.id,
        };

        try {
          const response = await fetch('http://localhost:8000/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          if (response.ok) {
            setIsSuccess(true);
            setErrorMessage(null);
          } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Failed to process payment.');
          }
        } catch (err) {
          setErrorMessage('Failed to process payment.');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 rounded-md mb-4 w-full"
        required
      />
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

const PaymentPage: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 min-h-screen">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Page</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentPage;





// src/components/PaymentForm.tsx
// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const PaymentForm: React.FC = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setLoading(true);

//         const { error, paymentIntent } = await stripe!.confirmCardPayment('client-secret-from-backend', {
//             payment_method: {
//                 card: elements!.getElement(CardElement)!,
//             },
//         });

//         setLoading(false);

//         if (error) {
//             console.error('Payment failed:', error.message);
//         } else if (paymentIntent) {
//             console.log('Payment succeeded:', paymentIntent.id);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe || !elements || loading}>
//                 {loading ? 'Processing...' : 'Pay'}
//             </button>
//         </form>
//     );
// };

// export default PaymentForm;

