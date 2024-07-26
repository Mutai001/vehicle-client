import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Pagination,
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
    },
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
    },
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

const featuredCompanies = [
  { name: 'Mercedes-benz', logo: 'https://group.mercedes-benz.com/bilder/konzern/tradition/die-entstehung-des-markennamens-mercedes-benz/geschichte-des-mercedes-benz-sterns/daimler-dreizack-stern-mit-lorbeerkranz-2001dig410-w800xh0.jpg' },
  { name: 'Toyota', logo: 'https://qph.cf2.quoracdn.net/main-qimg-8a6176a8b97e7f750eec65a56ddbb011-pjlq' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2552px-Honda_Logo.svg.png' },
  { name: 'Bmw', logo: 'https://1000logos.net/wp-content/uploads/2018/02/BMW-Logo-1963.png' },
];

const testimonials = [
  {
    name: 'William Rutto',
    text: 'Great service and friendly staff!',
    image: 'https://cdn.britannica.com/27/235427-050-B9BE0EAB/William-Ruto-press-conference-kenya.jpg',
  },
  {
    name: 'Jane Smith',
    text: 'Affordable prices and a wide range of vehicles.',
    image: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Jane-Smith.Mr-and-Mrs-Smith.webp',
  },
  {
    name: 'Cyrus Kimutai',
    text: 'Excellent customer support, highly recommended!',
    image: 'https://s2.r29static.com/bin/entry/307/x,80/2174240/image.jpg',
  },
];

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

  const [darkMode, setDarkMode] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const toggleColorMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/vehicles'); // Replace with your API endpoint
        setVehicles(response.data);
        setFeaturedVehicles(response.data.slice(0, 3)); // Example: First 3 vehicles as featured
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

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
              animation: 'zoomIn 1.5s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={featuredVehiclesRef}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Featured Vehicles
        </Typography>
        <Grid container spacing={4}>
          {featuredVehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={vehicle.model}
                  height="200"
                  image={vehicle.image || HeroImage}
                  title={vehicle.model}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {vehicle.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${vehicle.price} / day
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/vehicles/${vehicle.id}`}>
                    Learn More
                  </Button>
                  <Button size="small" color="primary" component={Link} to="/login">
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={servicesRef}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                {service.icon}
                <Typography variant="h6" style={{ marginTop: '16px', color: '#004d40' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '8px', color: '#004d40' }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ padding: '32px 0' }}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          All Vehicles
        </Typography>
        <Grid container spacing={4}>
          {currentVehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={vehicle.model}
                  height="200"
                  image={vehicle.image || HeroImage}
                  title={vehicle.model}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {vehicle.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${vehicle.price} / day
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/vehicles/${vehicle.id}`}>
                    Learn More
                  </Button>
                  <Button size="small" color="primary" component={Link} to="/login">
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(vehicles.length / vehiclesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}
        />
      </Container>

      <Container maxWidth="lg" style={{ padding: '32px 0' }}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Featured Companies
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featuredCompanies.map((company, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                <img src={company.logo} alt={company.name} style={{ width: '100%', height: 'auto' }} />
                <Typography variant="h6" style={{ marginTop: '16px', color: '#004d40' }}>
                  {company.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ padding: '32px 0' }}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Testimonials
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                <img src={testimonial.image} alt={testimonial.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                <Typography variant="h6" style={{ marginTop: '16px', color: '#004d40' }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '8px', color: '#004d40' }}>
                  {testimonial.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={contactRef}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Get In Touch
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px', textAlign: 'center' }}>
          Contact us for more information or to book a vehicle.
        </Typography>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          Email:Cyrus@vehiclerental.com | Phone: (123) 456-7890
        </Typography>
        <Grid container spacing={4} justifyContent="center" style={{ marginTop: '32px' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6" style={{ color: '#004d40' }}>
                Location
              </Typography>
              <Typography variant="body2" style={{ marginTop: '8px', color: '#004d40' }}>
                1234 Kutus St, Nairobi, State, 12345
              </Typography>
              {/* Add a map component here */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6" style={{ color: '#004d40' }}>
                Working Hours
              </Typography>
              <Typography variant="body2" style={{ marginTop: '8px', color: '#004d40' }}>
                Monday - Friday: 9am - 6pm
              </Typography>
              <Typography variant="body2" style={{ color: '#004d40' }}>
                Saturday: 10am - 4pm
              </Typography>
              <Typography variant="body2" style={{ color: '#004d40' }}>
                Sunday: Closed
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />

      <Fab
        color="primary"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#00bcd4',
          color: '#004d40',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        <ArrowUpward />
      </Fab>
    </ThemeProvider>
  );
};

export default HomePage;
