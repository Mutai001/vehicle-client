import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './sidebar';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';
import Footer from '../Common/Footer';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { Add, Edit, Delete } from '@mui/icons-material';

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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Partial<Location>>({});
  const [dialogType, setDialogType] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get<Location[]>('https://car-rental-backend-c5h2.onrender.com/api/locations');
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (type: 'create' | 'edit', location?: Location) => {
    setDialogType(type);
    if (location) {
      setCurrentLocation(location);
    } else {
      setCurrentLocation({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentLocation({});
  };

  const handleSave = async () => {
    try {
      if (dialogType === 'create') {
        await axios.post('https://car-rental-backend-c5h2.onrender.com/api/locations', currentLocation);
      } else {
        await axios.put(`https://car-rental-backend-c5h2.onrender.com/api/locations/${currentLocation.location_id}`, currentLocation);
      }
      fetchLocations();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleDelete = async (location_id: number) => {
    try {
      await axios.delete(`https://car-rental-backend-c5h2.onrender.com/api/locations/${location_id}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
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
    <>
      <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <div className="flex">
        <AdminSidebar />
        <div className={classes.root}>
          <Container className={classes.content}>
            <Typography variant="h4" className={classes.title}>
              Locations and Branches
            </Typography>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog('create')}>
              Add Location
            </Button>
            <Grid container spacing={3}>
              {locations.map((location) => (
                <Grid item xs={12} md={6} lg={4} key={location.location_id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h6">{location.name}</Typography>
                      <Typography color="textSecondary">{location.address}</Typography>
                      <Typography color="textSecondary">{location.contact_phone}</Typography>
                      <Typography color="textSecondary">Branches: {location.branch_count}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton color="primary" onClick={() => handleOpenDialog('edit', location)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(location.location_id)}>
                        <Delete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
      <Footer />

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === 'create' ? 'Add Location' : 'Edit Location'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === 'create'
              ? 'Fill in the details to add a new location.'
              : 'Update the details of the location.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={currentLocation.name || ''}
            onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={currentLocation.address || ''}
            onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Phone"
            type="text"
            fullWidth
            value={currentLocation.contact_phone || ''}
            onChange={(e) => setCurrentLocation({ ...currentLocation, contact_phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Branch Count"
            type="number"
            fullWidth
            value={currentLocation.branch_count || ''}
            onChange={(e) => setCurrentLocation({ ...currentLocation, branch_count: parseInt(e.target.value, 10) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LocationsAndBranches;
