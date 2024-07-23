import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import SupportIcon from '@mui/icons-material/Support';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import Header from './Common/Header';
// import Footer from './Common/Footer';

const services = [
  {
    title: 'Vehicle Rental',
    description: 'Wide range of vehicles for rent at competitive prices.',
    icon: <LocalShippingIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: 'Maintenance Service',
    description: 'Comprehensive vehicle maintenance services.',
    icon: <BuildIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your convenience.',
    icon: <SupportIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
  {
    title: 'Affordable Prices',
    description: 'Get the best prices for all our services.',
    icon: <AttachMoneyIcon style={{ fontSize: 50, color: '#1976d2' }} />,
  },
];

const Services: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Header /> */}
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper style={{ padding: '24px', textAlign: 'center' }}>
                <Box>{service.icon}</Box>
                <Typography variant="h6" style={{ marginTop: '16px' }}>{service.title}</Typography>
                <Typography variant="body2" style={{ marginTop: '8px' }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default Services;
