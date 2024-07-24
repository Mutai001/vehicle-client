import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Container,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';
import Sidebar from './sidebar';
import Footer from '../Common/Footer';


const AdminOverview: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState({
    bookings: 0,
    payments: 0,
    users: 0,
    cars: 0,
    locations: 0,
    tickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://car-rental-backend-c5h2.onrender.com/api/bookings'),
          fetch('https://car-rental-backend-c5h2.onrender.com/api/payments'),
          fetch('https://car-rental-backend-c5h2.onrender.com/api/users'),
          fetch('https://car-rental-backend-c5h2.onrender.com/api/vehicles'),
          fetch('https://car-rental-backend-c5h2.onrender.com/api/locations'),
          fetch('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets'),
        ]);
        const results = await Promise.all(responses.map(res => res.json()));
        setData({
          bookings: results[0].length,
          payments: results[1].length,
          users: results[2].length, 
          cars: results[3].length,
          locations: results[4].length,
          tickets: results[5].length,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <div className="flex">
        <Sidebar />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                      <DirectionsCarIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Cars
                    </Typography>
                    <Typography color="textSecondary">
                      {data.cars}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                      <MonetizationOnIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Payments
                    </Typography>
                    <Typography color="textSecondary">
                      {data.payments}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                      <PersonIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Users
                    </Typography>
                    <Typography color="textSecondary">
                      {data.users}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                      <LocationOnIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Locations
                    </Typography>
                    <Typography color="textSecondary">
                      {data.locations}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                      <ConfirmationNumberIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Tickets
                    </Typography>
                    <Typography color="textSecondary">
                      {data.tickets}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                      <DirectionsCarIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" component="h2">
                      Total Bookings
                    </Typography>
                    <Typography color="textSecondary">
                      {data.bookings}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminOverview;
