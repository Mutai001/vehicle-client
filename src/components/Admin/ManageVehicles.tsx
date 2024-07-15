import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Admin/sidebar';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Container,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

interface Vehicle {
  id: number;
  type: string;
  count: number;
}

const ManageVehicles: React.FC = () => {
  const theme = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ type: '', count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cars');
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (vehicle: Vehicle | null = null) => {
    setCurrentVehicle(vehicle);
    setForm(vehicle ? { type: vehicle.type, count: vehicle.count } : { type: '', count: 0 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission for adding/editing a vehicle
    setOpen(false);
  };

  const handleDelete = (_id: number) => {
    // Handle deleting a vehicle
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
        <div style={{ display: 'flex', height: '100vh' }}>

      <AdminSidebar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.background.default,
            zIndex: 1000,
            pb: 2,
            pt: 2,
            mt: 2
          }}
        >
          Manage Vehicles
        </Typography>
        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} md={6} key={vehicle.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                        <DirectionsCarIcon />
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" component="h2">
                        {vehicle.type}
                      </Typography>
                      <Typography color="textSecondary">
                        Count: {vehicle.count}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpen(vehicle)}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => handleOpen()}
          sx={{ marginTop: theme.spacing(3) }}
        >
          Add Vehicle
        </Button>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentVehicle ? 'Edit the details of the vehicle.' : 'Fill in the details of the new vehicle.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Vehicle Type"
            type="text"
            fullWidth
            variant="standard"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vehicle Count"
            type="number"
            fullWidth
            variant="standard"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: +e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentVehicle ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>

  );
};

export default ManageVehicles;
