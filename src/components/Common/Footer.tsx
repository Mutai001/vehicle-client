import React from 'react';
import { Container, Grid, Typography, Link, Box, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#004d40', color: '#e0f7fa', pt: 6, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Vehicle Rental Services provides high-quality vehicles for rent at competitive prices.
              Our mission is to ensure convenience and satisfaction for all our customers.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook" component="a" href="#">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" component="a" href="#">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" component="div">
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Services
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Vehicles
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                FAQs
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1 }}>
              Address: 1234 Kutus St, Nairobi, State, 12345
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1 }}>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1 }}>
              Email: Cyrus@vehiclerental.com
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 1 }}>
              Hours: Monday - Friday, 9am - 6pm
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(224, 247, 250, 0.2)' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Vehicle Rental Services. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;