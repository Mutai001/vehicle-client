import React from 'react';
import { Container, Grid, Typography, Link, Box, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a, #7e22ce)',
        color: '#ffffff',
        pt: 6, 
        pb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background bubbles */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0
      }}>
        {Array(10).fill(0).map((_, i) => (
          <Box 
            key={i}
            sx={{
              position: 'absolute',
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                '50%': { transform: `translateY(${Math.random() * 50 - 25}px) translateX(${Math.random() * 50 - 25}px)` }
              }
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Vehicle Rental Services provides high-quality vehicles for rent at competitive prices.
              Our mission is to ensure convenience and satisfaction for all our customers.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                sx={{ 
                  color: '#93c5fd',
                  '&:hover': { color: '#dbeafe', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease'
                }} 
                aria-label="Facebook" 
                component="a" 
                href="#"
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#93c5fd',
                  '&:hover': { color: '#dbeafe', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease'
                }} 
                aria-label="Twitter" 
                component="a" 
                href="#"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#93c5fd',
                  '&:hover': { color: '#dbeafe', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease'
                }} 
                aria-label="Instagram" 
                component="a" 
                href="#"
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#93c5fd',
                  '&:hover': { color: '#dbeafe', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease'
                }} 
                aria-label="LinkedIn" 
                component="a" 
                href="#"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Typography variant="body2" component="div">
              <Link 
                href="#" 
                sx={{ 
                  color: '#93c5fd', 
                  display: 'block', 
                  mb: 1, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#dbeafe',
                    textDecoration: 'underline'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Home
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: '#93c5fd', 
                  display: 'block', 
                  mb: 1, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#dbeafe',
                    textDecoration: 'underline'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Services
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: '#93c5fd', 
                  display: 'block', 
                  mb: 1, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#dbeafe',
                    textDecoration: 'underline'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Vehicles
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: '#93c5fd', 
                  display: 'block', 
                  mb: 1, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#dbeafe',
                    textDecoration: 'underline'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                Contact Us
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: '#93c5fd', 
                  display: 'block', 
                  mb: 1, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#dbeafe',
                    textDecoration: 'underline'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                FAQs
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Contact Information
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
              Address: 1234 Kutus St, Nairobi, State, 12345
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
              Phone: (+254) 72 222 7154
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
              Email: info@swiftride.com
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
              Hours: Monday - Friday, 9am - 6pm
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        <Box 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            mt: 2
          }}
        >
          <Typography variant="body2" align="center" sx={{ color: '#ffffff' }}>
            © {new Date().getFullYear()} Vehicle Rental Services. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;