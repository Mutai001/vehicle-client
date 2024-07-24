import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';
import AdminSidebar from './sidebar';
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
  status: {
    fontWeight: 'bold',
  },
}));

const statusColors: { [key: string]: string } = {
  active: '#4caf50', // Green
  maintenance: '#ff9800', // Orange
  retired: '#f44336', // Red
  available: '#2196f3', // Blue
  reserved: '#9c27b0', // Purple
};

interface Fleet {
  fleet_id: number;
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const FleetManagement: React.FC = () => {
  const classes = useStyles();
  const [fleet, setFleet] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentFleet, setCurrentFleet] = useState<Partial<Fleet>>({});
  const [dialogType, setDialogType] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      const response = await axios.get<Fleet[]>('https://car-rental-backend-c5h2.onrender.com/api/fleet-management');
      setFleet(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fleet data:', error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (type: 'create' | 'edit', fleet?: Fleet) => {
    setDialogType(type);
    if (fleet) {
      setCurrentFleet(fleet);
    } else {
      setCurrentFleet({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentFleet({});
  };

  const handleSave = async () => {
    try {
      if (dialogType === 'create') {
        await axios.post('https://car-rental-backend-c5h2.onrender.com/api/fleet-management', currentFleet);
      } else {
        await axios.put(`https://car-rental-backend-c5h2.onrender.com/api/fleet-management/${currentFleet.fleet_id}`, currentFleet);
      }
      fetchFleet();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving fleet data:', error);
    }
  };

  const handleDelete = async (fleet_id: number) => {
    try {
      await axios.delete(`https://car-rental-backend-c5h2.onrender.com/api/fleet-management/${fleet_id}`);
      fetchFleet();
    } catch (error) {
      console.error('Error deleting fleet data:', error);
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
            Fleet Management
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog('create')}>
            Add Fleet
          </Button>
          <Grid container spacing={3}>
            {fleet.map((fleetItem) => (
              <Grid item xs={12} md={6} lg={4} key={fleetItem.fleet_id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6">Vehicle ID: {fleetItem.vehicle_id}</Typography>
                    <Typography color="textSecondary">Acquisition Date: {fleetItem.acquisition_date}</Typography>
                    <Typography color="textSecondary">Depreciation Rate: {fleetItem.depreciation_rate}%</Typography>
                    <Typography color="textSecondary">Current Value: ${fleetItem.current_value}</Typography>
                    <Typography color="textSecondary">Maintenance Cost: ${fleetItem.maintenance_cost}</Typography>
                    <Typography className={classes.status} style={{ color: statusColors[fleetItem.status.toLowerCase()] }}>
                      Status: {fleetItem.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => handleOpenDialog('edit', fleetItem)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(fleetItem.fleet_id)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === 'create' ? 'Add Fleet' : 'Edit Fleet'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === 'create' ? 'Fill in the details to add a new fleet.' : 'Update the details of the fleet.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Vehicle ID"
            type="number"
            fullWidth
            value={currentFleet.vehicle_id || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, vehicle_id: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Acquisition Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={currentFleet.acquisition_date || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, acquisition_date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Depreciation Rate"
            type="number"
            fullWidth
            value={currentFleet.depreciation_rate || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, depreciation_rate: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Current Value"
            type="number"
            fullWidth
            value={currentFleet.current_value || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, current_value: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Maintenance Cost"
            type="number"
            fullWidth
            value={currentFleet.maintenance_cost || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, maintenance_cost: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={currentFleet.status || ''}
            onChange={(e) => setCurrentFleet({ ...currentFleet, status: e.target.value })}
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
    </div>
      <Footer />
    </>
  );
};

export default FleetManagement;
