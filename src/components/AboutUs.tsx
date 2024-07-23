import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
// import Header from './Common/Header';
// import Footer from './Common/Footer';

const AboutUs: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width:'max-w-screen-lg' }}>
      {/* <Header /> */}
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px' }}>
        <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
          About Us
        </Typography>
        <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            Welcome to our Vehicle Rental Management System. We offer a wide range of vehicles for rent at competitive prices, ensuring your travel needs are met with convenience and affordability. Our mission is to provide top-quality rental services with a focus on customer satisfaction.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            Our dedicated team is available 24/7 to support you with any inquiries or assistance you may need. We believe in providing comprehensive services that include maintenance and support to ensure your experience is seamless and enjoyable.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            Thank you for choosing us for your vehicle rental needs. We look forward to serving you!
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h6">Our Mission</Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                To provide high-quality vehicle rental services that meet the needs and exceed the expectations of our customers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h6">Our Vision</Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                To be the leading vehicle rental company known for exceptional service, reliability, and innovation.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h6">Our Values</Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Integrity, customer focus, excellence, and teamwork.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
