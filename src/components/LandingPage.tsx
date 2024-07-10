import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { CarRental, Login, PersonAdd, AdminPanelSettings, Person } from '@mui/icons-material';
import Footer from './Common/Footer';
import FeaturedVehicles from './FeaturedVehicles'; // Import the FeaturedVehicles component
import CarImage from '../assets/images/hero-image.png'; // Example image import
import OnlineSVG from '../assets/online.svg'; // Example SVG import
import ServicesSVG from '../assets/services.svg'; // Example SVG import
import ContactSVG from '../assets/contact.svg'; // Example SVG import
import GetInTouchSVG from '../assets/get-in-touch.svg'; // Example SVG import
import HeroImage from '../assets/images/Car1.png'; // Example hero image import

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <AppBar position="static" style={{ backgroundColor: '#424242' }}>
          <Toolbar>
            <CarRental fontSize="large" />
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
            justifyContent: 'center'
          }}
        >
          <Container>
            <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Welcome to Vehicle Rental Management System
            </Typography>
            <Typography variant="h5" style={{ marginBottom: '32px' }}>
              Your ultimate destination for renting vehicles
            </Typography>
            <Button
              component={Link}
              to="/user"
              variant="contained"
              color="primary"
              size="large"
            >
              Get Started
            </Button>
          </Container>
        </Box>

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
                <Box style={{ marginLeft: '16px', maxWidth: '200px' }}>
                  <img src={CarImage} alt="Car" style={{ width: '100%' }} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Box style={{ marginRight: '16px', maxWidth: '200px' }}>
                  <img src={OnlineSVG} alt="Online Booking" style={{ width: '100%' }} />
                </Box>
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

          <Grid container spacing={4} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <Box style={{ maxWidth: '200px', margin: '0 auto' }}>
                  <img src={ServicesSVG} alt="Our Services" style={{ width: '100%' }} />
                </Box>
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

          <Grid container spacing={4} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <Box style={{ maxWidth: '200px', margin: '0 auto' }}>
                  <img src={ContactSVG} alt="Contact Us" style={{ width: '100%' }} />
                </Box>
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

          <Grid container spacing={4} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper style={{ padding: '16px', textAlign: 'center' }}>
                <Box style={{ maxWidth: '200px', margin: '0 auto' }}>
                  <img src={GetInTouchSVG} alt="Get In Touch" style={{ width: '100%' }} />
                </Box>
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Get In Touch
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px' }}>
                  Have questions or need assistance? We're here to help.
                </Typography>
                <Button component={Link} to="/contact" variant="contained" color="primary">
                  Contact Us
                </Button>
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
