import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './sidebar';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';

// Define makeStyles function with proper typing
const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    padding: '2rem',
  },
  content: {
    flexGrow: 1,
  },
  card: {
    marginBottom: '1rem',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '0.5rem',
  },
  title: {
    marginBottom: '1rem',
  },
}));

interface Location {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  branch_count: number;
}

const LocationsAndBranches: React.FC = () => {
  const classes = useStyles();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get<Location[]>('http://localhost:8000/api/locations');
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AdminSidebar />
      <Container className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          Locations and Branches
        </Typography>
        <Grid container spacing={3}>
          {locations.map((location) => (
            <Grid item xs={12} md={6} lg={4} key={location.location_id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">
                    {location.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {location.address}
                  </Typography>
                  <Typography color="textSecondary">
                    {location.contact_phone}
                  </Typography>
                  <Typography color="textSecondary">
                    Branches: {location.branch_count}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default LocationsAndBranches;
