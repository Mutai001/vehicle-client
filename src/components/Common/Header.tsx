import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CarRental,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface HeaderProps {
  scrollToTop: () => void;
  scrollToFeaturedVehicles: () => void;
  scrollToServices: () => void;
  scrollToContact: () => void;
}

const Header: React.FC<HeaderProps> = ({
  scrollToTop,
  scrollToFeaturedVehicles,
  scrollToServices,
  scrollToContact,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" style={{ backgroundColor: '#00bcd4', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
      <Toolbar>
        <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="home">
          <CarRental fontSize="large" style={{ color: '#004d40' }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 8, color: '#004d40' }}>
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
  );
};

export default Header;