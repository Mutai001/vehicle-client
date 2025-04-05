import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  DirectionsCar,
  Handyman,
  ContactPhone,
  Login,
  Close,
} from '@mui/icons-material';

interface HeaderProps {
  scrollToTop: () => void;
  scrollToFeaturedVehicles: () => void;
  scrollToServices: () => void;
  scrollToContact: () => void;
}

const SwiftRideLogo = () => {
  return (
    <div className="flex items-center relative">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        {/* Car Body */}
        <rect x="15" y="50" width="70" height="25" rx="8" fill="#ffffff" className="animate-bounce" style={{ animationDuration: '3s' }} />
        
        {/* Car Top */}
        <path d="M30 50 L40 30 L60 30 L70 50" fill="#ffffff" />
        
        {/* Windows */}
        <path d="M40 34 L42 40 L58 40 L60 34" fill="#004d40" />
        
        {/* Wheels */}
        <circle cx="30" cy="75" r="10" fill="#004d40" className="animate-spin" style={{ animationDuration: '4s' }} />
        <circle cx="30" cy="75" r="5" fill="#00bcd4" />
        <circle cx="70" cy="75" r="10" fill="#004d40" className="animate-spin" style={{ animationDuration: '4s' }} />
        <circle cx="70" cy="75" r="5" fill="#00bcd4" />
        
        {/* Headlights */}
        <circle cx="15" cy="60" r="5" fill="#ffeb3b" className="animate-pulse" />
        <circle cx="85" cy="60" r="5" fill="#ffeb3b" className="animate-pulse" />
        
        {/* Speed Lines */}
        <line x1="5" y1="55" x2="15" y2="55" stroke="#ffffff" strokeWidth="2" className="animate-ping" style={{ animationDuration: '1.5s' }} />
        <line x1="0" y1="65" x2="10" y2="65" stroke="#ffffff" strokeWidth="2" className="animate-ping" style={{ animationDuration: '1s' }} />
      </svg>
      
      <Typography 
        variant="h6" 
        className="ml-2 font-bold text-white"
      >
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.1s' }}>S</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.2s' }}>w</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.3s' }}>i</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.4s' }}>f</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.5s' }}>t</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.6s' }}>R</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.7s' }}>i</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.8s' }}>d</span>
        <span className="animate-fadeIn inline-block" style={{ animationDelay: '0.9s' }}>e</span>
      </Typography>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({
  scrollToTop,
  scrollToFeaturedVehicles,
  scrollToServices,
  scrollToContact,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavClick = (callback: () => void) => {
    callback();
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <AppBar 
      position="fixed" 
      className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg' 
          : 'bg-gradient-to-r from-blue-700 to-blue-900'
      }`}
      elevation={scrolled ? 4 : 0}
    >
      <Toolbar className="justify-between">
        <Box 
          component={Link} 
          to="/" 
          className="flex items-center text-white no-underline"
          onClick={() => handleNavClick(scrollToTop)}
        >
          <SwiftRideLogo />
        </Box>
        
        {!isMobile && (
          <Box className="flex items-center space-x-4">
            <Button 
              color="inherit" 
              onClick={() => handleNavClick(scrollToTop)}
              className="text-white hover:text-blue-200 transition font-medium"
            >
              <Home className="mr-1" fontSize="small" />
              Home
            </Button>
            
            <Button 
              color="inherit" 
              onClick={() => handleNavClick(scrollToFeaturedVehicles)}
              className="text-white hover:text-blue-200 transition font-medium"
            >
              <DirectionsCar className="mr-1" fontSize="small" />
              Vehicles
            </Button>
            
            <Button 
              color="inherit" 
              onClick={() => handleNavClick(scrollToServices)}
              className="text-white hover:text-blue-200 transition font-medium"
            >
              <Handyman className="mr-1" fontSize="small" />
              Services
            </Button>
            
            <Button 
              color="inherit" 
              onClick={() => handleNavClick(scrollToContact)}
              className="text-white hover:text-blue-200 transition font-medium"
            >
              <ContactPhone className="mr-1" fontSize="small" />
              Contact
            </Button>
            
            <Button 
              component={Link} 
              to="/login" 
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded px-6 py-2 transition-all shadow-md hover:shadow-lg flex items-center"
              sx={{ fontSize: '1rem' }}
            >
              <Login className="mr-2" />
              Login
            </Button>
          </Box>
        )}
        
        {isMobile && (
          <IconButton 
            edge="end" 
            color="inherit" 
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="text-white"
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      
      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="md:hidden"
      >
        <Box
          className="w-64 h-full bg-gradient-to-b from-blue-900 to-purple-900 text-white"
          role="presentation"
        >
          <Box className="flex justify-between items-center p-4 border-b border-white/10">
            <SwiftRideLogo />
            <IconButton color="inherit" onClick={toggleDrawer(false)}>
              <Close className="text-white" />
            </IconButton>
          </Box>
          
          <List>
            <ListItem button onClick={() => handleNavClick(scrollToTop)}>
              <ListItemIcon>
                <Home className="text-blue-300" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <ListItem button onClick={() => handleNavClick(scrollToFeaturedVehicles)}>
              <ListItemIcon>
                <DirectionsCar className="text-blue-300" />
              </ListItemIcon>
              <ListItemText primary="Featured Vehicles" />
            </ListItem>
            
            <ListItem button onClick={() => handleNavClick(scrollToServices)}>
              <ListItemIcon>
                <Handyman className="text-blue-300" />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            
            <ListItem button onClick={() => handleNavClick(scrollToContact)}>
              <ListItemIcon>
                <ContactPhone className="text-blue-300" />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            
            <Box className="border-t border-white/10 mt-4 pt-2">
              <ListItem 
                button 
                component={Link} 
                to="/login"
                className="bg-blue-600 my-2 mx-4 rounded shadow-md"
              >
                <ListItemIcon>
                  <Login className="text-white" />
                </ListItemIcon>
                <ListItemText 
                  primary="Login" 
                  primaryTypographyProps={{ 
                    className: "font-bold text-white" 
                  }} 
                />
              </ListItem>
            </Box>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;