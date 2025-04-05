import React, { useRef } from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import {
  LocalShipping as LocalShippingIcon,
  Build as BuildIcon,
  Support as SupportIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';


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

const ServicesSection: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={servicesRef}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={3} 
              style={{ padding: '16px', textAlign: 'center' }}
              sx={{ 
                transition: 'transform 0.3s', 
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
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
  );
};

export default ServicesSection;