import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';


const testimonials = [
  {
    name: 'William Rutto',
    text: 'Great service and friendly staff!',
    image: 'https://cdn.britannica.com/27/235427-050-B9BE0EAB/William-Ruto-press-conference-kenya.jpg',
  },
  {
    name: 'Jane Smith',
    text: 'Affordable prices and a wide range of vehicles.',
    image: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Jane-Smith.Mr-and-Mrs-Smith.webp',
  },
  {
    name: 'Cyrus Kimutai',
    text: 'Excellent customer support, highly recommended!',
    image: 'https://s2.r29static.com/bin/entry/307/x,80/2174240/image.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Testimonials
      </Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={3} 
              style={{ padding: '16px', textAlign: 'center' }}
              sx={{ 
                borderRadius: '16px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                }
              }}
            >
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  border: '4px solid #e0f7fa'
                }} 
              />
              <Typography variant="h6" style={{ marginTop: '16px', color: '#004d40' }}>
                {testimonial.name}
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  marginTop: '8px', 
                  color: '#004d40',
                  fontStyle: 'italic',
                  padding: '0 8px'
                }}
              >
                "{testimonial.text}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TestimonialsSection;