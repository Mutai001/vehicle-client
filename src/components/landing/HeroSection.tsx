import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.9; // 90vh
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Luxury vehicles data
    const vehicles = [
      {
        type: 'sports',
        color: '#e63946',
        width: 220,
        height: 60,
        wheelRadius: 15,
        speed: 1.5,
        y: canvas.height * 0.7,
        x: -300,
      },
      {
        type: 'suv',
        color: '#2a9d8f',
        width: 240,
        height: 80,
        wheelRadius: 18,
        speed: 1,
        y: canvas.height * 0.82,
        x: -600,
      },
      {
        type: 'sedan',
        color: '#457b9d',
        width: 200,
        height: 55,
        wheelRadius: 14,
        speed: 1.2,
        y: canvas.height * 0.75,
        x: -900,
      }
    ];
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a2a6c');
      gradient.addColorStop(0.5, '#2d4263');
      gradient.addColorStop(1, '#0b1026');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw road
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.25);
      
      // Draw road markings
      ctx.strokeStyle = '#f1faee';
      ctx.setLineDash([40, 20]);
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.77);
      ctx.lineTo(canvas.width, canvas.height * 0.77);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw city silhouette
      ctx.fillStyle = '#0f172a';
      // Buildings
      for (let i = 0; i < canvas.width; i += 60) {
        const height = Math.random() * 100 + 50;
        ctx.fillRect(i, canvas.height * 0.65 - height, 40, height);
        
        // Windows
        ctx.fillStyle = '#facc15';
        for (let j = 10; j < height - 10; j += 20) {
          for (let k = 5; k < 30; k += 15) {
            if (Math.random() > 0.3) {
              ctx.fillRect(i + k, canvas.height * 0.65 - j - 10, 8, 8);
            }
          }
        }
        ctx.fillStyle = '#0f172a';
      }
      
      // Draw stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        const size = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Twinkle effect
        if (Math.random() > 0.99) {
          ctx.beginPath();
          ctx.arc(x, y, size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw animated vehicles
      vehicles.forEach(vehicle => {
        // Update position
        vehicle.x += vehicle.speed;
        if (vehicle.x > canvas.width + 300) {
          vehicle.x = -300;
        }
        
        // Draw vehicle body
        ctx.fillStyle = vehicle.color;
        ctx.beginPath();
        
        if (vehicle.type === 'sports') {
          // Sports car
          ctx.moveTo(vehicle.x, vehicle.y);
          ctx.lineTo(vehicle.x + vehicle.width * 0.25, vehicle.y - vehicle.height * 0.6);
          ctx.lineTo(vehicle.x + vehicle.width * 0.6, vehicle.y - vehicle.height * 0.6);
          ctx.lineTo(vehicle.x + vehicle.width * 0.85, vehicle.y - vehicle.height * 0.2);
          ctx.lineTo(vehicle.x + vehicle.width, vehicle.y);
          ctx.lineTo(vehicle.x, vehicle.y);
        } else if (vehicle.type === 'suv') {
          // SUV
          ctx.fillRect(vehicle.x, vehicle.y - vehicle.height, vehicle.width, vehicle.height);
          // Roof rack
          ctx.fillStyle = '#333';
          ctx.fillRect(vehicle.x + 20, vehicle.y - vehicle.height - 5, vehicle.width - 40, 5);
        } else {
          // Sedan
          ctx.fillRect(vehicle.x, vehicle.y - vehicle.height * 0.5, vehicle.width, vehicle.height * 0.5);
          ctx.fillRect(vehicle.x + 30, vehicle.y - vehicle.height, vehicle.width - 60, vehicle.height * 0.5);
        }
        ctx.fill();
        
        // Draw windows
        ctx.fillStyle = '#a8dadc';
        if (vehicle.type === 'sports') {
          ctx.fillRect(vehicle.x + vehicle.width * 0.3, vehicle.y - vehicle.height * 0.55, vehicle.width * 0.25, vehicle.height * 0.3);
        } else if (vehicle.type === 'suv') {
          // Front window
          ctx.fillRect(vehicle.x + 20, vehicle.y - vehicle.height + 10, 40, vehicle.height * 0.4);
          // Rear windows
          ctx.fillRect(vehicle.x + 70, vehicle.y - vehicle.height + 10, vehicle.width - 100, vehicle.height * 0.4);
        } else {
          ctx.fillRect(vehicle.x + 40, vehicle.y - vehicle.height + 10, vehicle.width - 80, vehicle.height * 0.3);
        }
        
        // Draw wheels
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(vehicle.x + vehicle.width * 0.2, vehicle.y, vehicle.wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(vehicle.x + vehicle.width * 0.8, vehicle.y, vehicle.wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw hubcaps
        ctx.fillStyle = '#ddd';
        ctx.beginPath();
        ctx.arc(vehicle.x + vehicle.width * 0.2, vehicle.y, vehicle.wheelRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(vehicle.x + vehicle.width * 0.8, vehicle.y, vehicle.wheelRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Add vehicle lights
        ctx.fillStyle = '#f1faee';
        ctx.beginPath();
        ctx.arc(vehicle.x + vehicle.width - 5, vehicle.y - vehicle.height * 0.3, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Add headlights with glow
        ctx.fillStyle = '#f1faee';
        ctx.beginPath();
        ctx.arc(vehicle.x + 5, vehicle.y - vehicle.height * 0.3, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Headlight beam effect
        const gradient = ctx.createRadialGradient(
          vehicle.x + 5, vehicle.y - vehicle.height * 0.3, 0,
          vehicle.x + 5, vehicle.y - vehicle.height * 0.3, 50
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(vehicle.x + 5, vehicle.y - vehicle.height * 0.3, 50, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <Box
      sx={{
        height: '90vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      
      {/* Content Overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              animation: 'fadeInDown 2s',
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              color: '#e0f7fa',
            }}
          >
            Welcome to SwiftRide
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: '32px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              animation: 'fadeInUp 2s',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              color: '#e0f7fa',
              maxWidth: '800px',
              margin: '0 auto 32px',
            }}
          >
            Experience luxury on wheels with our premium fleet of vehicles. 
            From sports cars to SUVs, we have the perfect ride for every occasion.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                animation: 'zoomIn 1.5s',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                backgroundColor: '#00bcd4',
                padding: '10px 24px',
                '&:hover': {
                  backgroundColor: '#008ba3',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
            
            <Button
              component={Link}
              to="/vehicles"
              variant="outlined"
              size="large"
              sx={{
                animation: 'zoomIn 1.5s',
                delay: '0.3s',
                border: '2px solid #e0f7fa',
                color: '#e0f7fa',
                padding: '10px 24px',
                '&:hover': {
                  backgroundColor: 'rgba(224, 247, 250, 0.1)',
                  borderColor: '#e0f7fa',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Explore Vehicles
            </Button>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4, 
              marginTop: 6,
              color: '#e0f7fa',
              animation: 'fadeInUp 2s',
              animationDelay: '0.5s',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>50+</Typography>
              <Typography variant="body1">Luxury Vehicles</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>24/7</Typography>
              <Typography variant="body1">Customer Support</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>100%</Typography>
              <Typography variant="body1">Satisfaction</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Add global animations */}
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;