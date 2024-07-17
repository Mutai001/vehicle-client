import { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, InputAdornment, Link, Snackbar, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Email, Phone, Home, Lock, AccountCircle } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface FormData {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
  username: string;
  role: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  contactPhone: yup.string().required('Contact phone is required'),
  address: yup.string().required('Address is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  username: yup.string().required('Username is required'),
  role: yup.string().required('Role is required')
});

const Registration = () => {
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
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const res = await fetch('http://localhost:8000/api/google-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: credentialResponse.credential })
        });

        const responseData = await res.json();

        if (res.ok) {
          setSnackbar({ open: true, message: 'Google login successful!', severity: 'success' });
          navigate('/dashboard');
        } else {
          setSnackbar({ open: true, message: responseData.error || 'Google login failed!', severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
        console.error('Error:', error);
      }
    } else {
      setSnackbar({ open: true, message: 'Google login failed!', severity: 'error' });
    }
  };

  const handleGoogleLoginFailure = () => {
    setSnackbar({ open: true, message: 'Google login failed!', severity: 'error' });
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
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
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      autoFocus
                      error={!!errors.fullName}
                      helperText={errors.fullName ? errors.fullName.message : ''}
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
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
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
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.contactPhone}
                      helperText={errors.contactPhone ? errors.contactPhone.message : ''}
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
                            <Home />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ''}
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
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
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
              <Grid item xs={12}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="role"
                      label="Role"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.role}
                      helperText={errors.role ? errors.role.message : ''}
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
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </Box>
        </Box>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Registration;

