import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import HeroImage from '../../assets/images/Car1.png';
import HeroImage2 from '../../assets/images/car2.png';
import HeroImage3 from '../../assets/images/car3.png';

const HeroSection: React.FC = () => {
  return (
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
            backgroundColor: '#00bcd4',
            '&:hover': {
              backgroundColor: '#008ba3',
            },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;