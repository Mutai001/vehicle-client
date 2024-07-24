import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { AccountCircle, DirectionsCar, Payment } from '@mui/icons-material';
import axios from 'axios';
import Footer from '../Common/Footer';
// import Header from '../Common/Header';
import UserHeader from './UserHeader';
import Sidebar from './Sidebar';

const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>({
    user_id: '',
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: '',
    created_at: '',
    updated_at: ''
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/users/1');
        setUserData(userResponse.data); // Ensure response data structure matches the expected JSON format

        // Fetch bookings data
        const bookingsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/bookings');
        setBookings(bookingsResponse.data);

        // Fetch payments data
        const paymentsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/payments');
        setPayments(paymentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <UserHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <Box className="py-8">
            <Typography variant="h4" className="text-center mb-8">
              User Dashboard
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card className="bg-gray-100">
                  <CardContent>
                    <AccountCircle fontSize="large" className="text-blue-500" />
                    <Typography variant="h6" className="mt-2">
                      User Profile
                    </Typography>
                    <Typography>Name: {userData.full_name}</Typography>
                    <Typography>Email: {userData.email}</Typography>
                    <Typography>Phone: {userData.contact_phone}</Typography>
                    <Typography>Address: {userData.address}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="bg-gray-100">
                  <CardContent>
                    <DirectionsCar fontSize="large" className="text-green-500" />
                    <Typography variant="h6" className="mt-2">
                      Recent Bookings
                    </Typography>
                    {bookings.slice(0, 2).map((booking, index) => (
                      <Typography key={index}>Booking #{index + 1}: {booking.vehicle}</Typography>
                    ))}
                    <Button variant="contained" color="primary" className="mt-4">
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="bg-gray-100">
                  <CardContent>
                    <Payment fontSize="large" className="text-red-500" />
                    <Typography variant="h6" className="mt-2">
                      Payment History
                    </Typography>
                    {payments.slice(0, 2).map((payment, index) => (
                      <Typography key={index}>Payment #{index + 1}: ${payment.amount}</Typography>
                    ))}
                    <Button variant="contained" color="primary" className="mt-4">
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
