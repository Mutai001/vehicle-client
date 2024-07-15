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
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import { Theme } from '@mui/system';
import {
  Phone as PhoneIcon,
  LocationCity as LocationCityIcon,
} from '@mui/icons-material';

// Define your theme
const theme = createTheme();

// Define makeStyles function with proper typing
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(2),
    height: '100%',
  },
  cardContent: {
    flex: '1 0 auto',
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
  const classes = useStyles(); // Use useStyles properly here
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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AdminSidebar />
        <Container className={classes.content}>
          <Typography variant="h4" gutterBottom>
            Locations and Branches
          </Typography>
          <Grid container spacing={3}>
            {locations.map((location) => (
              <Grid item xs={12} md={6} key={location.location_id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography component="h5" variant="h5">
                      {location.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <LocationCityIcon fontSize="small" /> {location.address}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <PhoneIcon fontSize="small" /> {location.contact_phone}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
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
    </ThemeProvider>
  );
};

export default LocationsAndBranches;
