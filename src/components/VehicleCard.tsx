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
  useMediaQuery,
  useTheme,
  Fab,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Switch,
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
import Footer from './Common/Footer';
import HeroImage from '../assets/images/Car1.png';
import HeroImage2 from '../assets/images/car2.png';
import HeroImage3 from '../assets/images/car3.png';

// Define your default and custom themes
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00bcd4', // Teal color
    },
    background: {
      default: '#e0f7fa', // Light teal background
    },
    text: {
      primary: '#004d40', // Dark teal text
    }
  },
});

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4', // Teal color
    },
    background: {
      default: '#004d40', // Dark teal background
    },
    text: {
      primary: '#e0f7fa', // Light teal text
    }
  },
});

const services = [
  {
    title: 'Vehicle Rental',
    description: 'Wide range of vehicles for rent at competitive prices.',
    icon: <LocalShippingIcon style={{ fontSize: 50, color: '#00bcd4' }} />,
  },
  {
    title: 'Maintenance Service',
    description: 'Comprehensive vehicle maintenance services.',
    icon: <BuildIcon style={{ fontSize: 50, color: '#00bcd4' }} />,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your convenience.',
    icon: <SupportIcon style={{ fontSize: 50, color: '#00bcd4' }} />,
  },
  {
    title: 'Affordable Prices',
    description: 'Get the best prices for all our services.',
    icon: <AttachMoneyIcon style={{ fontSize: 50, color: '#00bcd4' }} />,
  },
];

const vehicles = [
  {
    id: 1,
    imageUrl: 'https://example.com/car1.jpg',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 50,
    description: 'A reliable and efficient sedan.'
  },
  {
    id: 2,
    imageUrl: 'https://example.com/car2.jpg',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 45,
    description: 'A compact car with great fuel economy.'
  },
  // Add more vehicles as needed
];

const VehicleCard: React.FC<{ vehicle: any }> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="h-60 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{`${vehicle.make} ${vehicle.model}`}</h3>
        <p className="text-gray-800 text-lg mb-4">{vehicle.year}</p>
        <p className="text-gray-600 mb-4">{vehicle.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-semibold">${vehicle.price} / day</p>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const featuredVehiclesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedVehicles = () => {
    featuredVehiclesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleColorMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? customTheme : defaultTheme}>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: darkMode ? '#004d40' : '#00bcd4', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
        <Toolbar>
          <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="home">
            <CarRental fontSize="large" style={{ color: darkMode ? '#e0f7fa' : '#004d40' }} />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 8, color: darkMode ? '#e0f7fa' : '#004d40' }}>
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
              <Switch
                checked={darkMode}
                onChange={toggleColorMode}
                color="default"
                inputProps={{ 'aria-label': 'toggle dark mode' }}
              />
            </>
          )}
          {isMobile && (
            <IconButton edge="end" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: `url(${HeroImage}), url(${HeroImage2}), url(${HeroImage3})`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          color: '#e0f7fa',
          textAlign: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '50px 0',
          opacity: 0.8,
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
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
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
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
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
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Featured Vehicles
        </Typography>
        <Grid container spacing={4}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ my: 8 }} ref={servicesRef}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                {service.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {service.title}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />

      <Fab
        color="primary"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <ArrowUpward />
      </Fab>
    </ThemeProvider>
  );
};

export default HomePage;
