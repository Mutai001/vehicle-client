import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from '@mui/material';
import { CreditCard, Payment, LocalAtm } from '@mui/icons-material';
// import PayPal from '@mui/icons-material/PayPal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

const PaymentPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (!error && paymentMethod) {
        // Handle successful payment method creation
        console.log(paymentMethod);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent>
          <Typography variant="h4" className="mb-4 text-center">
            Choose Your Payment Method
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<CreditCard />}
                className={`mb-4 ${selectedPaymentMethod === 'stripe' ? 'bg-blue-600' : ''}`}
                onClick={() => handlePaymentMethodChange('stripe')}
              >
                Pay with Stripe
              </Button>
              {selectedPaymentMethod === 'stripe' && (
                <Box className="mt-4 p-4 bg-gray-200 rounded">
                  <Elements stripe={stripePromise}>
                    <CardElement className="p-2 border border-gray-300 rounded" />
                  </Elements>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={handleStripePayment}
                  >
                    Pay Now
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Payment />}
                className={`mb-4 ${selectedPaymentMethod === 'paypal' ? 'bg-blue-600' : ''}`}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                Pay with PayPal
              </Button>
              {selectedPaymentMethod === 'paypal' && (
                <Box className="mt-4 p-4 bg-gray-200 rounded">
                  {/* Integrate PayPal Button */}
                  <div>PayPal Payment Form</div>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Payment />}
                className={`mb-4 ${selectedPaymentMethod === 'visa' ? 'bg-blue-600' : ''}`}
                onClick={() => handlePaymentMethodChange('visa')}
              >
                Pay with Visa
              </Button>
              {selectedPaymentMethod === 'visa' && (
                <Box className="mt-4 p-4 bg-gray-200 rounded">
                  {/* Integrate Visa Payment */}
                  <div>Visa Payment Form</div>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LocalAtm />}
                className={`mb-4 ${selectedPaymentMethod === 'mpesa' ? 'bg-blue-600' : ''}`}
                onClick={() => handlePaymentMethodChange('mpesa')}
              >
                Pay with Mpesa
              </Button>
              {selectedPaymentMethod === 'mpesa' && (
                <Box className="mt-4 p-4 bg-gray-200 rounded">
                  {/* Integrate Mpesa Payment */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Mpesa Phone Number"
                    className="mb-4"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => console.log('Mpesa Payment')}
                  >
                    Pay Now
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
