// payment.tsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Sidebar from './Sidebar';
import Footer from '../Common/Footer';
import UserHeader from './UserHeader';
import { Box, Button, Card, CardContent, Container, Grid, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';

// Stripe public key
const stripePromise = loadStripe('pk_test_51PbJox2KMNFPNnEGF0rcBxjD8rRZCyPhy7tOlnDDQUerAnMSstet7bBcg0mgZrXrUhprYbDSbA4Bnm37F1fIsuJn00NUmJnlOy');

// Payment interface
interface Payment {
  payment_id: number;
  booking_id: number;
  amount: string;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

// Payment Form Component
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
        setErrorMessage(error.message || 'Failed to create payment method.');
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
          const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          if (response.ok) {
            setIsSuccess(true);
            setErrorMessage(null);
            window.location.href = '/payment-success';
          } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Failed to process payment.');
          }
        } catch (err) {
          if (err instanceof Error) {
            setErrorMessage(err.message || 'Failed to process payment.');
          } else {
            setErrorMessage('Failed to process payment.');
          }
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 4, bgcolor: '#f9f9f9', border: '1px solid #ddd' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
          <PaymentIcon sx={{ mr: 1, color: '#1976d2' }} /> Payment Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border p-2 rounded-md w-full"
              style={{ borderColor: '#1976d2' }}
              required
            />
          </Box>
          <CardElement className="border p-2 rounded-md mb-4" />
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
          </Button>
          {errorMessage && <Alert severity="error" sx={{ mt: 2, bgcolor: '#f44336', color: '#fff' }}>{errorMessage}</Alert>}
          {isSuccess && <Alert severity="success" sx={{ mt: 2, bgcolor: '#4caf50', color: '#fff' }}>Payment successful!</Alert>}
        </form>
      </CardContent>
    </Card>
  );
};

// Payment History Component
const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/payments');
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch payment history.');
        }
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch payment history.');
        } else {
          setError('Failed to fetch payment history.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Card variant="outlined" sx={{ bgcolor: '#f9f9f9', border: '1px solid #ddd' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
          <HistoryIcon sx={{ mr: 1, color: '#1976d2' }} /> Payment History
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ bgcolor: '#f44336', color: '#fff' }}>{error}</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#1976d2', color: '#fff' }}>
                  <TableCell sx={{ color: '#fff' }}>Amount</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Method</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Transaction ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.payment_id}>
                    <TableCell sx={{ color: '#1976d2' }}>${payment.amount}</TableCell>
                    <TableCell sx={{ color: payment.payment_status === 'Successful' ? '#4caf50' : '#f44336' }}>
                      {payment.payment_status}
                    </TableCell>
                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.payment_method}</TableCell>
                    <TableCell>{payment.transaction_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

// Payment Page Component
const PaymentPage: React.FC = () => {
  return (
    <>
      <UserHeader onToggleSidebar={() => {}} isSidebarCollapsed={false} />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              </Grid>
              <Grid item xs={12} md={6}>
                <PaymentHistory />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
