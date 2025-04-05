import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, InputAdornment, Link, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Email, Phone, Home, Lock, AccountCircle, DirectionsCar, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
  username: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  contactPhone: yup.string().required('Contact phone is required'),
  address: yup.string().required('Address is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
});

interface StyledTextFieldProps {
  name: keyof FormData;
  label: string;
  icon: React.ReactNode;
  type?: string;
}

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      contactPhone: '',
      address: '',
      password: '',
      username: ''
    }
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const onSubmit = async (data: FormData) => {
    setLoading(true);
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
        setSnackbar({ open: true, message: 'Registration successful! Redirecting...', severity: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setSnackbar({ open: true, message: responseData.error || 'Registration failed!', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const CarAnimation = () => {
    const [position, setPosition] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setPosition((prev) => (prev + 1) % 100);
      }, 100);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <Box sx={{ 
        position: 'absolute', 
        bottom: '10px', 
        left: `${position}%`, 
        transform: 'translateX(-100%)',
        transition: 'left 0.1s linear',
        display: { xs: 'none', md: 'block' }
      }}>
        <DirectionsCar sx={{ color: '#ffffff', fontSize: 40 }} />
      </Box>
    );
  };

  const StyledTextField = ({ name, label, icon, type = "text" }: StyledTextFieldProps) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            required
            fullWidth
            id={name}
            label={label}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {icon}
                </InputAdornment>
              ),
              ...(type === "password" && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: '#93c5fd' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }),
              sx: { 
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                },
                transition: 'all 0.3s ease'
              }
            }}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name]?.message : ''}
            sx={{ 
              '& .MuiInputBase-input': { 
                color: '#ffffff',
                padding: '12px 14px'
              }, 
              '& .MuiInputLabel-root': { 
                color: '#93c5fd',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
              '& .MuiFormHelperText-root': {
                color: errors[name] ? '#ff4444' : 'rgba(255, 255, 255, 0.6)'
              }
            }}
          />
        )}
      />
    );
  };

  return (
    <Container maxWidth={false} sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #1e3a8a, #7e22ce)', 
      overflow: 'hidden',
      position: 'relative',
      p: 2
    }}>
      {/* Background bubbles */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0
      }}>
        {Array(10).fill(0).map((_, i) => (
          <Box 
            key={i}
            sx={{
              position: 'absolute',
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                '50%': { transform: `translateY(${Math.random() * 50 - 25}px) translateX(${Math.random() * 50 - 25}px)` }
              }
            }}
          />
        ))}
      </Box>

      {/* Car animation */}
      <CarAnimation />

      {/* Main form container */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        style={{ 
          width: isLarge ? '900px' : isMobile ? '100%' : isMedium ? '75%' : '650px', 
          maxWidth: '95%',
          zIndex: 1 
        }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            padding: { xs: 3, sm: 4 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Form title */}
          <Typography component="h1" variant="h5" sx={{ mb: 4, color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
            Join our Car Rental Service
          </Typography>

          {/* Form */}
          <motion.div>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Form Fields */}
                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="subtitle1" sx={{ color: '#93c5fd', mb: 2, fontWeight: 'bold' }}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="fullName" 
                          label="Full Name" 
                          icon={<AccountCircle sx={{ color: '#93c5fd' }} />} 
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="username" 
                          label="Username" 
                          icon={<AccountCircle sx={{ color: '#93c5fd' }} />} 
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="subtitle1" sx={{ color: '#93c5fd', mb: 2, fontWeight: 'bold' }}>
                      Contact Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="email" 
                          label="Email Address" 
                          icon={<Email sx={{ color: '#93c5fd' }} />} 
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="contactPhone" 
                          label="Contact Phone" 
                          icon={<Phone sx={{ color: '#93c5fd' }} />} 
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="subtitle1" sx={{ color: '#93c5fd', mb: 2, fontWeight: 'bold' }}>
                      Address Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="address" 
                          label="Address" 
                          icon={<Home sx={{ color: '#93c5fd' }} />} 
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="subtitle1" sx={{ color: '#93c5fd', mb: 2, fontWeight: 'bold' }}>
                      Security Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <StyledTextField 
                          name="password" 
                          label="Password" 
                          icon={<Lock sx={{ color: '#93c5fd' }} />}
                          type="password"
                        />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, display: 'block', ml: 1 }}>
                          Password must be at least 6 characters, include at least one uppercase letter and one number.
                        </Typography>
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>
              </Grid>
              
              {/* Submit button */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  sx={{ 
                    background: 'linear-gradient(to right, #3b82f6, #1d4ed8)',
                    '&:hover': { 
                      background: 'linear-gradient(to right, #1d4ed8, #3b82f6)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.6)'
                    },
                    color: '#ffffff',
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    position: 'relative',
                    fontWeight: 'bold',
                    minWidth: '200px'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                  ) : (
                    'Register Now'
                  )}
                </Button>
              </Box>
              
              {/* Login link */}
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Grid item>
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    variant="body2" 
                    sx={{ 
                      color: '#93c5fd',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#dbeafe'
                      }
                    }}
                  >
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      {/* Snackbar notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%', 
            backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
            color: '#ffffff',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Registration;