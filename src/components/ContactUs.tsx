import React, { useRef } from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { Email, Phone, LocationOn, AccessTime } from '@mui/icons-material';

const ContactUS: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={contactRef}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Get In Touch
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Contact us for more information or to book a vehicle.
      </Typography>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '24px' }}>
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Email style={{ color: '#00bcd4', marginRight: '8px' }} />
            <Typography variant="body2">Cyrus@vehiclerental.com</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Phone style={{ color: '#00bcd4', marginRight: '8px' }} />
            <Typography variant="body2">(123) 456-7890</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3} 
            style={{ padding: '24px', textAlign: 'center', height: '100%' }}
            sx={{
              borderRadius: '12px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 15px rgba(0,189,212,0.25)'
              }
            }}
          >
            <LocationOn style={{ fontSize: 40, color: '#00bcd4', marginBottom: '8px' }} />
            <Typography variant="h6" style={{ color: '#004d40', marginBottom: '16px' }}>
              Location
            </Typography>
            <Typography variant="body2" style={{ color: '#004d40' }}>
              1234 Kutus St, Nairobi, State, 12345
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3} 
            style={{ padding: '24px', textAlign: 'center', height: '100%' }}
            sx={{
              borderRadius: '12px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 15px rgba(0,189,212,0.25)'
              }
            }}
          >
            <AccessTime style={{ fontSize: 40, color: '#00bcd4', marginBottom: '8px' }} />
            <Typography variant="h6" style={{ color: '#004d40', marginBottom: '16px' }}>
              Working Hours
            </Typography>
            <Typography variant="body2" style={{ color: '#004d40' }}>
              Monday - Friday: 9am - 6pm
            </Typography>
            <Typography variant="body2" style={{ color: '#004d40', marginTop: '4px' }}>
              Saturday: 10am - 4pm
            </Typography>
            <Typography variant="body2" style={{ color: '#004d40', marginTop: '4px' }}>
              Sunday: Closed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUS;