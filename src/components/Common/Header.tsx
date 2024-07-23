import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CarRental,
  ArrowDropDown,
  Menu as MenuIcon,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // For dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#424242' }}>
      <Toolbar>
        <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="home">
          <CarRental fontSize="large" style={{ color: '#ffc107' }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 8, color: '#ffffff' }}>
          Vehicle Rental Management System
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about-us">
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/services">
              Services
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact Us
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
  );
};

export default Header;
