import { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, InputAdornment, Link, Snackbar, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Email, Phone, Home, Lock, AccountCircle } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Define the form data interface
interface FormData {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
  username: string;
}

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  contactPhone: yup.string().required('Contact phone is required'),
  address: yup.string().required('Address is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  username: yup.string().required('Username is required'),
});

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const onSubmit = async (data: FormData) => {
    try {
      const requestData = {
        full_name: data.fullName,
        email: data.email,
        contact_phone: data.contactPhone,
        address: data.address,
        password: data.password,
        username: data.username,
        role: 'user',
      };

      const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
        navigate('/login');
      } else {
        setSnackbar({ open: true, message: responseData.error || 'Registration failed!', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Use media query to handle responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1E2A38, #2D3A4C)', overflow: 'hidden' }}>
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          width: isMobile ? '100%' : '500px',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#ffffff' }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.fullName}
                    helperText={errors.fullName ? errors.fullName.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="contactPhone"
                    label="Contact Phone"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone ? errors.contactPhone.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.address}
                    helperText={errors.address ? errors.address.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#ffffff' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#007bff', ':hover': { backgroundColor: '#0056b3' } }}
            style={{ color: '#ffffff' }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: '#ffffff' }}>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Registration;
