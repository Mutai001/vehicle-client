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
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
});

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      contactPhone: '',
      address: '',
      password: '',
      username: ''
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Use media query to handle responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    { title: "Personal Info", fields: ["fullName", "username"] },
    { title: "Contact Details", fields: ["email", "contactPhone", "address"] },
    { title: "Security", fields: ["password"] }
  ];

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

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Custom animation variants
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

  // Decorative car animation
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

  return (
    <Container maxWidth={false} sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #1E2A38, #2D3A4C)',
      overflow: 'hidden',
      position: 'relative',
      p: 2
    }}>
      {/* Animated background elements */}
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
              background: 'rgba(255, 255, 255, 0.03)',
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

      <CarAnimation />

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        style={{ width: isMobile ? '100%' : isMedium ? '70%' : '500px', zIndex: 1 }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            padding: { xs: 2, sm: 4 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Progress indicator */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
            {steps.map((step, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%' }}>
                <Box 
                  sx={{ 
                    width: 35, 
                    height: 35, 
                    borderRadius: '50%', 
                    backgroundColor: index <= currentStep ? '#007bff' : 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    mb: 1,
                    boxShadow: index <= currentStep ? '0 0 10px #007bff' : 'none',
                  }}
                >
                  <Typography sx={{ color: '#ffffff' }}>{index + 1}</Typography>
                </Box>
                <Typography 
                  sx={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    textAlign: 'center',
                    opacity: index <= currentStep ? 1 : 0.6,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
            Join our Car Rental Service
          </Typography>

          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {currentStep === 0 && (
                  <>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.fullName}
                              helperText={errors.fullName ? errors.fullName.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.username}
                              helperText={errors.username ? errors.username.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                    </Grid>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.email}
                              helperText={errors.email ? errors.email.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.contactPhone}
                              helperText={errors.contactPhone ? errors.contactPhone.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.address}
                              helperText={errors.address ? errors.address.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                    </Grid>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
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
                              type={showPassword ? "text" : "password"}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Lock sx={{ color: '#ffffff' }} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleTogglePasswordVisibility}
                                      edge="end"
                                      sx={{ color: '#ffffff' }}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'
                                  },
                                  transition: 'all 0.3s ease'
                                }
                              }}
                              error={!!errors.password}
                              helperText={errors.password ? errors.password.message : ''}
                              sx={{ 
                                input: { color: '#ffffff' }, 
                                label: { color: '#ffffff' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </motion.div>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, display: 'block' }}>
                        Password must be at least 6 characters, include at least one uppercase letter and one number.
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
                {currentStep > 0 && (
                  <Button
                    variant="outlined"
                    onClick={prevStep}
                    sx={{ 
                      color: '#ffffff', 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        borderColor: '#ffffff',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      },
                      borderRadius: 2,
                      px: 3
                    }}
                  >
                    Back
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    sx={{ 
                      backgroundColor: '#007bff', 
                      '&:hover': { backgroundColor: '#0056b3' },
                      color: '#ffffff',
                      borderRadius: 2,
                      px: 3,
                      ml: currentStep === 0 ? 'auto' : 0
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ 
                      backgroundColor: '#007bff', 
                      '&:hover': { backgroundColor: '#0056b3' },
                      color: '#ffffff',
                      borderRadius: 2,
                      px: 3,
                      ml: currentStep === 0 ? 'auto' : 0,
                      position: 'relative'
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                    ) : (
                      'Register'
                    )}
                  </Button>
                )}
              </Box>
              
              {currentStep === 2 && (
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <Link 
                      component={RouterLink} 
                      to="/login" 
                      variant="body2" 
                      sx={{ 
                        color: '#ffffff',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </motion.div>
        </Box>
      </motion.div>

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

      {/* Fix the style element to avoid jsx and global attribute errors */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Container>
  );
};

export default Registration;