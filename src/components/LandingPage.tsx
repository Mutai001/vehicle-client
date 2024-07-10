import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import {
  CarRental,
  Login,
  PersonAdd,
  AdminPanelSettings,
  Person,
  DirectionsCar,
  BookOnline,
  SupportAgent,
  LocationOn,
  Email,
  Phone,
  Send,
} from '@mui/icons-material';
import Footer from './Common/Footer';
import FeaturedVehicles from './FeaturedVehicles';
import HeroImage from '../assets/images/Car1.png'; // Example hero image import

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <AppBar position="static" style={{ backgroundColor: '#424242' }}>
          <Toolbar>
            <CarRental fontSize="large" style={{ color: 'red' }} />
            <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 8 }}>
              Vehicle Rental Services
            </Typography>
            <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>Login</Button>
            <Button color="inherit" component={Link} to="/register" startIcon={<PersonAdd />}>Register</Button>
            <Button color="inherit" component={Link} to="/admin" startIcon={<AdminPanelSettings />}>Admin</Button>
            <Button color="inherit" component={Link} to="/user" startIcon={<Person />}>User</Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 2s',
            position: 'relative',
          }}
        >
          <Container>
            <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Welcome to Vehicle Rental Management System
            </Typography>
            <Typography variant="h5" style={{ marginBottom: '32px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Your ultimate destination for renting vehicles
            </Typography>
            <Button
              component={Link}
              to="/user"
              variant="contained"
              color="primary"
              size="large"
              style={{ animation: 'pulse 2s infinite' }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Navigation Bar */}
        <AppBar position="static" color="default" style={{ marginTop: '16px' }}>
          <Toolbar>
            <Button color="inherit" component={Link} to="#featured-vehicles">Featured Vehicles</Button>
            <Button color="inherit" component={Link} to="#services">Services</Button>
            <Button color="inherit" component={Link} to="#contact-us">Contact Us</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container style={{ padding: '32px 0' }}>
          <Grid container spacing={4} style={{ marginBottom: '48px' }}>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Box style={{ flex: 1 }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Book Your Vehicle
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '16px' }}>
                    Find and book your desired vehicle with ease.
                  </Typography>
                  <Button component={Link} to="/user" variant="contained" color="primary">
                    Get Started
                  </Button>
                </Box>
                <DirectionsCar fontSize="large" style={{ marginLeft: '16px', color: '#424242' }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <BookOnline fontSize="large" style={{ marginRight: '16px', color: '#424242' }} />
                <Box style={{ flex: 1 }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Online Booking System
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '16px' }}>
                    Manage your bookings online from anywhere, anytime.
                  </Typography>
                  <Button component={Link} to="/user" variant="contained" color="primary">
                    Learn More
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Featured Vehicles Section */}
          <FeaturedVehicles />

          <Grid container spacing={4} id="services" style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <SupportAgent fontSize="large" style={{ color: '#424242', marginBottom: '16px' }} />
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Our Services
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '16px', backgroundColor: '#eeeeee' }}>
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Vehicle Selection
                      </Typography>
                      <Typography variant="body1">
                        Browse a wide range of vehicles categorized by type, make, and model.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '16px', backgroundColor: '#eeeeee' }}>
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Booking System
                      </Typography>
                      <Typography variant="body1">
                        Easily book vehicles based on your preferences and schedule.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '16px', backgroundColor: '#eeeeee' }}>
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Customer Support
                      </Typography>
                      <Typography variant="body1">
                        Access dedicated customer support for any inquiries or assistance needed.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4} id="contact-us" style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <LocationOn fontSize="large" style={{ color: '#424242', marginBottom: '16px' }} />
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Contact Us
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '16px', backgroundColor: '#eeeeee' }}>
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Location
                      </Typography>
                      <Typography variant="body1">
                        123 Vehicle Rental Street, City, Country
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '16px', backgroundColor: '#eeeeee' }}>
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Email
                      </Typography>
                      <Typography variant="body1">
                        info@vehiclerental.com
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Get In Touch Section */}
          <Grid container spacing={4} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Get In Touch
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '32px' }}>
                  Have questions or need assistance? We're here to help.
                </Typography>
                <form noValidate autoComplete="off">
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" startIcon={<Send />}>
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>

        </Container>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
