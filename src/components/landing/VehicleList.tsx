import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Pagination } from '@mui/material';
import HeroImage from '../../assets/images/Car1.png';

interface Vehicle {
  id: string;
  model: string;
  description: string;
  price: number;
  image?: string;
}

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }}>
      <Typography variant="h4" style={{ marginBottom: '32px', textAlign: 'center' }}>
        All Vehicles
      </Typography>
      <Grid container spacing={4}>
        {currentVehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s', 
              '&:hover': { 
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }
            }}>
              <CardMedia
                component="img"
                alt={vehicle.model}
                height="200"
                image={vehicle.image || HeroImage}
                title={vehicle.model}
              />
              <CardContent sx={{ flexGrow: 1 }}>
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
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/login"
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
      <Pagination
        count={Math.ceil(vehicles.length / vehiclesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default VehicleList;