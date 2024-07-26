import { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, InputAdornment, Link, Snackbar, Alert, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Lock, CheckCircleOutline, Close } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', result.token); // Store token
        setSnackbar({ open: true, message: 'Login successful! Welcome back.', severity: 'success' });
        // Redirect based on role
        if (result.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user');
        }
      } else {
        setSnackbar({ open: true, message: result.message || 'Login failed!', severity: 'error' });
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
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1E2A38, #2D3A4C)', overflow: 'hidden' }}>
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          animation: 'fadeIn 1s ease-in-out',
          width: isMobile ? '100%' : '400px',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, color: '#ffffff' }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                    autoComplete="username" // Added autocomplete
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
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="current-password" // Added autocomplete
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
            sx={{ mt: 3, mb: 2, backgroundColor: '#FF5722', ':hover': { backgroundColor: '#E64A19' } }}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: '#BB86FC' }}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{ 
          '& .MuiAlert-root': { 
            borderRadius: '8px', 
            boxShadow: 3 
          } 
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%', 
            borderRadius: '8px',
            boxShadow: 3,
            fontWeight: 'bold',
            fontSize: '16px',
            backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
            color: '#fff',
            '& .MuiAlert-icon': { 
              color: snackbar.severity === 'success' ? '#fff' : '#fff',
            },
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CheckCircleOutline fontSize="large" style={{ color: snackbar.severity === 'success' ? 'inherit' : 'inherit' }} />
            </Grid>
            <Grid item xs>
              {snackbar.message}
            </Grid>
          </Grid>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
