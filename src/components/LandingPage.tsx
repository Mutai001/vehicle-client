import React, { useRef } from 'react';
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
} from '@mui/material';
import {
  CarRental,
  AdminPanelSettings,
  Person,
  DirectionsCar,
  BookOnline,
  SupportAgent,
  LocationOn,
  Email,
  Send,
  ArrowDropDown,
} from '@mui/icons-material';
import FeaturedVehicles from './FeaturedVehicles'; // Import your FeaturedVehicles component here
import Footer from './Common/Footer'; // Import your Footer component here
import HeroImage from '../assets/images/Car1.png'; // Example hero image import
import HeroImage2 from '../assets/images/car2.png'; // Another hero image import
import HeroImage3 from '../assets/images/car3.png'; // Another hero image import

const HomePage: React.FC = () => {
  const featuredVehiclesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedVehicles = () => {
    if (featuredVehiclesRef.current) {
      featuredVehiclesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContactUs = () => {
    if (contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGetInTouch = () => {
    if (getInTouchRef.current) {
      getInTouchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <Button color="inherit" onClick={scrollToFeaturedVehicles}>
              Featured Vehicles
            </Button>
            <Button color="inherit" onClick={scrollToServices}>
              Services
            </Button>
            <Button color="inherit" onClick={scrollToContactUs}>
              Contact Us
            </Button>
            <Button color="inherit" onClick={scrollToGetInTouch}>
              Get In Touch
            </Button>

            {/* Admin Menu */}
            <Button
              color="inherit"
              startIcon={<AdminPanelSettings />}
              endIcon={<ArrowDropDown />}
              component={Link}
              to="/admin"
            >
              Admin
            </Button>

            {/* User Menu */}
            <Button
              color="inherit"
              startIcon={<Person />}
              endIcon={<ArrowDropDown />}
              component={Link}
              to="/user"
            >
              User
            </Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: `url(${HeroImage}), url(${HeroImage2}), url(${HeroImage3})`,
            backgroundSize: 'cover, contain, contain',
            backgroundPosition: 'center, top left, bottom right',
            backgroundRepeat: 'no-repeat',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'fadeIn 2s',
            opacity: 0.9,
            '&:hover': {
              opacity: 1, // Example hover effect
            },
          }}
        >
          <Container>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                animation: 'fadeInDown 2s',
              }}
            >
              Welcome to Vehicle Rental Management System
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: '32px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                animation: 'fadeInUp 2s',
              }}
            >
              Your ultimate destination for renting vehicles
            </Typography>
            <Button
              component={Link}
              to="/user"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                animation: 'pulse 2s infinite',
              }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Main Content */}
        <Container style={{ padding: '32px 0' }}>
          <Grid container spacing={4} style={{ marginBottom: '48px' }} ref={featuredVehiclesRef}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
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
              <Paper
                sx={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
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

          <Grid container spacing={4} ref={servicesRef} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <SupportAgent fontSize="large" style={{ color: '#424242', marginBottom: '16px' }} />
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Our Services
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        padding: '16px',
                        backgroundColor: '#eeeeee',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Vehicle Selection
                      </Typography>
                      <Typography variant="body1">
                        Browse a wide range of vehicles categorized by type, make, and model.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        padding: '16px',
                        backgroundColor: '#eeeeee',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Booking System
                      </Typography>
                      <Typography variant="body1">
                        Easily book vehicles based on your preferences and schedule.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        padding: '16px',
                        backgroundColor: '#eeeeee',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
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

          <Grid container spacing={4} ref={contactUsRef} style={{ marginBottom: '48px' }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <LocationOn fontSize="large" style={{ color: '#424242', marginBottom: '16px' }} />
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Contact Us
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        padding: '16px',
                        backgroundColor: '#eeeeee',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Email Us
                      </Typography>
                      <Typography variant="body1">
                        You can email us at support@vehiclerentals.com for any inquiries.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        padding: '16px',
                        backgroundColor: '#eeeeee',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        Visit Us
                      </Typography>
                      <Typography variant="body1">
                        Our office is located at 123 Rental St, Car City.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4} ref={getInTouchRef}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Email fontSize="large" style={{ color: '#424242', marginBottom: '16px' }} />
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Get In Touch
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      style={{ marginBottom: '16px' }}
                    />
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      style={{ marginBottom: '16px' }}
                    />
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      style={{ marginBottom: '16px' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      style={{ marginBottom: '16px' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Send />}
                      style={{ width: '100%', transition: 'transform 0.2s' }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
