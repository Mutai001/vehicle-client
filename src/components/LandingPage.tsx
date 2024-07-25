// import React, { useRef } from 'react';
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
  IconButton,
  useMediaQuery,
  useTheme,
  Fab,
  TextField,
} from '@mui/material';
import {
  CarRental,
  Menu as MenuIcon,
  ArrowUpward,
  LocalShipping as LocalShippingIcon,
  Build as BuildIcon,
  Support as SupportIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import FeaturedVehicles from './FeaturedVehicles';
import Footer from './Common/Footer';
import HeroImage from '../assets/images/Car1.png';
import HeroImage2 from '../assets/images/car2.png';
import HeroImage3 from '../assets/images/car3.png';
import { useRef } from 'react';

const services = [
  {
    title: 'Vehicle Rental',
    description: 'Wide range of vehicles for rent at competitive prices.',
    icon: <LocalShippingIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: 'Maintenance Service',
    description: 'Comprehensive vehicle maintenance services.',
    icon: <BuildIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your convenience.',
    icon: <SupportIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: 'Affordable Prices',
    description: 'Get the best prices for all our services.',
    icon: <AttachMoneyIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const featuredVehiclesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {!isMobile && (
              <>
                <Button color="inherit" onClick={scrollToTop}>
                  Home
                </Button>
                <Button color="inherit" onClick={scrollToFeaturedVehicles}>
                  Featured Vehicles
                </Button>
                <Button color="inherit" onClick={scrollToServices}>
                  Services
                </Button>
                <Button color="inherit" onClick={scrollToContact}>
                  Contact Us
                </Button>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
            {isMobile && (
              <IconButton edge="end" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: `url(${HeroImage}), url(${HeroImage2}), url(${HeroImage3})`,
            backgroundSize: 'cover, contain, contain',
            backgroundPosition: 'center, top left, bottom right',
            backgroundRepeat: 'no-repeat',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '50px 0',
            opacity: 0.9,
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                animation: 'fadeInDown 2s',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Adjusted font sizes
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
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }, // Adjusted font sizes
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
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }, // Adjusted font sizes
              }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Featured Vehicles */}
        <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={featuredVehiclesRef}>
          <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center', fontSize: '2rem' }}>
            {/* Featured Vehicles */}
          </Typography>
          <FeaturedVehicles />
        </Container>

        {/* Services Section */}
        <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={servicesRef}>
          <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center', fontSize: '2rem' }}>
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper style={{ padding: '24px', textAlign: 'center', transition: 'transform 0.2s' }}>
                  <Box>{service.icon}</Box>
                  <Typography variant="h6" style={{ marginTop: '16px', fontSize: '1.5rem' }}>{service.title}</Typography>
                  <Typography variant="body2" style={{ marginTop: '8px', fontSize: '1rem' }}>
                    {service.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* About Us Section */}
        <Container maxWidth="lg" style={{ padding: '32px 0' }}>
          <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center', fontSize: '2rem' }}>
            About Us
          </Typography>
          <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Typography variant="body1" style={{ marginBottom: '16px', fontSize: '1rem' }}>
              Welcome to our Vehicle Rental Management System. We offer a wide range of vehicles for rent at competitive prices, ensuring your travel needs are met with convenience and affordability. Our mission is to provide top-quality rental services with a focus on customer satisfaction.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '16px', fontSize: '1rem' }}>
              Our dedicated team is available 24/7 to support you with any inquiries or assistance you may need. We believe in providing comprehensive services that include maintenance and support to ensure your experience is seamless and enjoyable.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '16px', fontSize: '1rem' }}>
              Thank you for choosing us as your preferred rental service provider. We look forward to serving you and exceeding your expectations.
            </Typography>
          </Box>
        </Container>

        {/* Contact Us Section */}
        <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={contactRef}>
          <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center', fontSize: '2rem' }}>
            Contact Us
          </Typography>
          <Box style={{ textAlign: 'center' }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" size="large">
              Send Message
            </Button>
          </Box>
        </Container>

        {/* Back to Top Button */}
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <ArrowUpward />
        </Fab>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
