import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Admin/sidebar';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';
import Footer from '../Common/Footer';
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
  TextField,
  Pagination,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTheme } from '@mui/material/styles';

interface Vehicle {
  vehicle_id: number;
  vehicleSpec_id: number;
  rental_rate: number;
  availability: boolean;
  vehicle_image: string;
  created_at: string;
  updated_at: string;
}

const ManageVehicles: React.FC = () => {
  const theme = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Vehicle>({
    vehicle_id: 0,
    vehicleSpec_id: 0,
    rental_rate: 0,
    availability: true,
    vehicle_image: '',
    created_at: '',
    updated_at: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 2;
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const pageCount = Math.ceil(vehicles.length / vehiclesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        const formattedData: Vehicle[] = data.map((vehicle: any) => ({
          ...vehicle,
          rental_rate: Number(vehicle.rental_rate),
        }));
        setVehicles(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (vehicle: Vehicle | null = null) => {
    setCurrentVehicle(vehicle);
    setForm(vehicle ? { ...vehicle } : {
      vehicle_id: 0,
      vehicleSpec_id: 0,
      rental_rate: 0,
      availability: true,
      vehicle_image: '',
      created_at: '',
      updated_at: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const method = currentVehicle ? 'PUT' : 'POST';
      const url = currentVehicle
        ? `https://car-rental-backend-c5h2.onrender.com/api/vehicles/${currentVehicle.vehicle_id}`
        : 'https://car-rental-backend-c5h2.onrender.com/api/vehicles';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to save vehicle');
      }

      const updatedVehicle: Vehicle = await response.json();
      setVehicles((prev) =>
        currentVehicle
          ? prev.map((v) => (v.vehicle_id === updatedVehicle.vehicle_id ? updatedVehicle : v))
          : [...prev, updatedVehicle]
      );
    } catch (error) {
      console.error('Error saving vehicle:', error);
    } finally {
      setOpen(false);
    }
  };

  const handleDelete = async (vehicle_id: number) => {
    try {
      const response = await fetch(`https://car-rental-backend-c5h2.onrender.com/api/vehicles/${vehicle_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }

      setVehicles((prev) => prev.filter((vehicle) => vehicle.vehicle_id !== vehicle_id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const totalVehicles = vehicles.length;
  const totalRevenue = vehicles.reduce((acc, vehicle) => acc + vehicle.rental_rate, 0);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <AdminHeader onToggleSidebar={() => {}} isSidebarCollapsed={false} />
            <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen p-4" style={{ flexGrow: 1 }}>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <div
              className="bg-cover bg-center py-8 rounded-lg shadow-md text-center text-white"
              style={{
                backgroundImage: 'url(path/to/your/header-background.jpg)',
                padding: '20px',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1000,
                  pb: 2,
                  pt: 2,
                  mt: 2,
                }}
              >
                Manage Vehicles
              </Typography>
            </div>

            <Grid container spacing={3} className="mt-4">
              <Grid item xs={12} sm={6} md={3}>
                <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <CarRentalIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" component="h2">
                          Total Vehicles
                        </Typography>
                        <Typography variant="h4">{totalVehicles}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="bg-gradient-to-r from-pink-400 to-red-500 text-white">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" component="h2">
                          Total Revenue
                        </Typography>
                        <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* Add more stats as needed */}
            </Grid>

            <Grid container spacing={3} className="mt-4">
              {currentVehicles.map((vehicle) => (
                <Grid item xs={12} md={6} key={vehicle.vehicle_id}>
                  <Card className="transition-transform transform hover:scale-105">
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                            <DirectionsCarIcon />
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h6" component="h2">
                            Vehicle ID: {vehicle.vehicle_id}
                          </Typography>
                          <Typography>Vehicle Spec ID: {vehicle.vehicleSpec_id}</Typography>
                          <Typography>Rental Rate: ${vehicle.rental_rate.toFixed(2)}</Typography>
                          <Typography>Availability: {vehicle.availability ? 'Available' : 'Not Available'}</Typography>
                          <div style={{ maxWidth: '100%', height: 'auto' }}>
                            <img src={vehicle.vehicle_image} alt={`Vehicle ${vehicle.vehicle_id}`} style={{ maxWidth: '100%', height: 'auto' }} />
                          </div>
                        </Grid>
                        <Grid item>
                          <Button
                            startIcon={<EditIcon />}
                            onClick={() => handleOpen(vehicle)}
                            className="text-white"
                            sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(vehicle.vehicle_id)}
                            className="text-white"
                            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
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

            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="mt-4"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                '& .Mui-selected': { backgroundColor: 'purple', color: 'white' },
              }}
            />

            <Button
              startIcon={<AddCircleIcon />}
              onClick={() => handleOpen()}
              className="fixed bottom-4 right-4 text-white"
              sx={{
                backgroundColor: 'green',
                '&:hover': { backgroundColor: 'darkgreen' },
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
              }}
            >
              Add Vehicle
            </Button>
          </Container>
        </div>
      </div>

      <Footer />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentVehicle ? 'Edit the details of the vehicle.' : 'Enter the details of the new vehicle.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="vehicleSpec_id"
            label="Vehicle Spec ID"
            type="number"
            fullWidth
            value={form.vehicleSpec_id}
            onChange={(e) => setForm({ ...form, vehicleSpec_id: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            id="rental_rate"
            label="Rental Rate"
            type="number"
            fullWidth
            value={form.rental_rate}
            onChange={(e) => setForm({ ...form, rental_rate: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            id="availability"
            label="Availability"
            type="text"
            fullWidth
            value={form.availability ? 'Available' : 'Not Available'}
            onChange={(e) => setForm({ ...form, availability: e.target.value.toLowerCase() === 'available' })}
          />
          <TextField
            margin="dense"
            id="vehicle_image"
            label="Vehicle Image URL"
            type="text"
            fullWidth
            value={form.vehicle_image}
            onChange={(e) => setForm({ ...form, vehicle_image: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentVehicle ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageVehicles;
