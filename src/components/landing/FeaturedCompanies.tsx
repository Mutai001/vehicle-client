import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';


const featuredCompanies = [
  { name: 'Mercedes-benz', logo: 'https://group.mercedes-benz.com/bilder/konzern/tradition/die-entstehung-des-markennamens-mercedes-benz/geschichte-des-mercedes-benz-sterns/daimler-dreizack-stern-mit-lorbeerkranz-2001dig410-w800xh0.jpg' },
  { name: 'Toyota', logo: 'https://qph.cf2.quoracdn.net/main-qimg-8a6176a8b97e7f750eec65a56ddbb011-pjlq' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2552px-Honda_Logo.svg.png' },
  { name: 'Bmw', logo: 'https://1000logos.net/wp-content/uploads/2018/02/BMW-Logo-1963.png' },
];

const FeaturedCompanies: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Featured Companies
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {featuredCompanies.map((company, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Paper 
              elevation={3} 
              style={{ padding: '16px', textAlign: 'center' }}
              sx={{ 
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0,189,212,0.3)'
                }
              }}
            >
              <img src={company.logo} alt={company.name} style={{ width: '100%', height: 'auto' }} />
              <Typography variant="h6" style={{ marginTop: '16px', color: '#004d40' }}>
                {company.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedCompanies;