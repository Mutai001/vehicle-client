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
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CarRental,
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
import MapImage from '../assets/images/map.png'; // Example map image import

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

  // For dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <AppBar position="static" style={{ backgroundColor: '#424242' }}>
          <Toolbar>
            <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="home">
              <CarRental fontSize="large" style={{ color: '#ffc107' }} />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 8, color: '#ffffff' }}>
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

            {/* Combined User and Admin Menu */}
            <Button
              color="inherit"
              endIcon={<ArrowDropDown />}
              onClick={handleMenuClick}
              aria-controls="user-admin-menu"
              aria-haspopup="true"
            >
              User & Admin
            </Button>
            <Menu
              id="user-admin-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/user" onClick={handleClose}>
                User
              </MenuItem>
              <MenuItem component={Link} to="/admin" onClick={handleClose}>
                Admin
              </MenuItem>
            </Menu>
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
              to="/register"
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
                  <Button component={Link} to="/register" variant="contained" color="primary">
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
                  <Button component={Link} to="/register" variant="contained" color="primary">
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
                        Vehicle Rentals
                      </Typography>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>
                        Wide range of vehicles to choose from for your needs.
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
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>
                        24/7 customer support to assist you with your queries.
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
                        Locations
                      </Typography>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>
                        Multiple locations to serve you better.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4} ref={contactUsRef}>
            <Grid item xs={12} md={6}>
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
                  Our Locations
                </Typography>
                <img
                  src={MapImage}
                  alt="Our Locations"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    transition: 'opacity 0.5s',
                  }}
                />
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                  Find us at multiple locations across the city.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  Contact Us
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                  />
                  <TextField
                    label="Your Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<Send />}
                    sx={{ marginTop: '16px' }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Get In Touch Section */}
        <Container ref={getInTouchRef} style={{ padding: '32px 0', backgroundColor: '#eeeeee' }}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
            Get In Touch
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '16px', textAlign: 'center' }}>
            Have any questions or need support? Reach out to us.
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', borderRadius: '4px' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Send />}
              sx={{ marginTop: '16px' }}
            >
              Send Message
            </Button>
          </Box>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
