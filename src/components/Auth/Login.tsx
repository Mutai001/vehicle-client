import { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, InputAdornment, Link, Snackbar, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Lock, CheckCircleOutline } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        // Example navigation based on role
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
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
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: '#007bff', color: '#fff' }}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CheckCircleOutline fontSize="large" style={{ color: snackbar.severity === 'success' ? 'green' : 'red' }} />
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
