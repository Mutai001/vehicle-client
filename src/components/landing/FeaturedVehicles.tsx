import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import HeroImage from '../../assets/images/Car1.png';

interface Vehicle {
  id: string;
  model: string;
  description: string;
  price: number;
  image?: string;
}

interface FeaturedVehiclesProps {
  featuredVehicles: Vehicle[];
}

const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({ featuredVehicles }) => {
  const featuredVehiclesRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }} ref={featuredVehiclesRef}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        Featured Vehicles
      </Typography>
      <Grid container spacing={4}>
        {featuredVehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <Card sx={{ 
              transition: 'transform 0.3s, box-shadow 0.3s', 
              '&:hover': { 
                transform: 'translateY(-10px)', 
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)' 
              }
            }}>
              <CardMedia
                component="img"
                alt={vehicle.model}
                height="200"
                image={vehicle.image || HeroImage}
                title={vehicle.model}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {vehicle.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {vehicle.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${vehicle.price} / day
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/vehicles/${vehicle.id}`}>
                  Learn More
                </Button>
                <Button 
                  size="small" 
                  color="primary" 
                  component={Link} 
                  to="/login"
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#00bcd4',
                    '&:hover': {
                      backgroundColor: '#008ba3',
                    },
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedVehicles;