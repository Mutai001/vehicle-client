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
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Fab,
} from '@mui/material';
import {
  CarRental,
  DirectionsCar,
  BookOnline,
  ArrowDropDown,
  Menu as MenuIcon,
  ArrowUpward,
} from '@mui/icons-material';
import FeaturedVehicles from './FeaturedVehicles';
import Footer from './Common/Footer';
import HeroImage from '../assets/images/Car1.png';
import HeroImage2 from '../assets/images/car2.png';
import HeroImage3 from '../assets/images/car3.png';
import Services from './Services';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const featuredVehiclesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                <Button component={Link} to="/contact" color="inherit">
                  Contact Us
                </Button>
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
              </>
            )}
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
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
              opacity: 1,
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
        <Container maxWidth={false} style={{ padding: '32px 0', width: '100%' }}>
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
                <DirectionsCar fontSize="large" style={{ marginLeft: '16px', color: '#FF5733' }} />
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
                <BookOnline fontSize="large" style={{ marginRight: '16px', color: '#C70039' }} />
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
                <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Our Services
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px' }}>
                  We offer a variety of services to cater to your needs.
                </Typography>
                <Button component={Link} to="/services" variant="contained" color="primary">
                  Explore Services
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Services/>
          <AboutUs/>
          <ContactUs/>
          
        </Container>

        {/* Footer */}
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <Fab
        color="primary"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        <ArrowUpward />
      </Fab>
    </>
  );
};

export default HomePage;
