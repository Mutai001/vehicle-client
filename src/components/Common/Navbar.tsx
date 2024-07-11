import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button,IconButton } from '@mui/material';
import { LocationOn,CarRental } from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <AppBar position="static" style={{ backgroundColor: '#424242' }}>
          <Toolbar className="bg-gray-800 text-white p-4 flex justify-between items-center">
             <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="home">
              <CarRental fontSize="large" style={{ color: '#ffc107' }} />
            </IconButton>
            <nav className="space-x-4">
                        <Button component={Link} to="/logout" className="text-white hover:underline">
                <LocationOn style={{ color: '#ffffff' }} />
                Logout
              </Button>
            </nav>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default HomePage;

