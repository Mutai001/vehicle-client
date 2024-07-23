import React from 'react';
import { Container, Typography, Box, Grid, Paper, TextField, Button } from '@mui/material';
// import Header from './Common/Header';
// import Footer from './Common/Footer';

const ContactUs: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Header /> */}
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px' }}>
        <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
          Contact Us
        </Typography>
        <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            We would love to hear from you! Please fill out the form below and we will get in touch with you shortly.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: '24px', textAlign: 'center' }}>
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h6">Contact Information</Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Address: 123 Main Street, Anytown, USA
              </Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Phone: (123) 456-7890
              </Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Email: info@vehiclerental.com
              </Typography>
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Working Hours: Mon - Fri, 9:00 AM - 6:00 PM
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default ContactUs;
