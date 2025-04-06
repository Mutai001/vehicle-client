/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useRef, useEffect, useState } from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Box, 
  Button 
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Build as BuildIcon,
  Headset as SupportIcon,
  AttachMoney as MoneyIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

// Define types for our service objects
interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  features: string[];
}

interface ServiceCardProps {
  service: ServiceProps;
  index: number;
}

// Custom service card component with 3D effects and animations
const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, index * 150); // Staggered animation
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);
  
  // 3D card rotation handling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20; // Reduced rotation for better UX
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)
    `;
  };
  
  const resetCardPosition = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
      `;
    }
  };
  
  return (
    <Box
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCardPosition();
      }}
      onMouseMove={handleMouseMove}
      sx={{
        borderRadius: 4,
        position: 'relative',
        background: isHovered 
          ? `linear-gradient(135deg, ${service.gradientStart}, ${service.gradientEnd})`
          : 'rgba(255, 255, 255, 0.95)',
        padding: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: isHovered 
          ? '0 15px 30px rgba(0, 188, 212, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)' 
          : '0 8px 16px rgba(0, 0, 0, 0.1)',
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
        opacity: isInView ? 1 : 0,
        color: isHovered ? '#fff' : 'inherit',
        overflow: 'hidden',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, ${service.accentColor}, transparent 70%)`,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          zIndex: -1,
        },
        '&:hover::before': {
          opacity: 0.2,
        },
      }}
    >
      {/* Animated background particles */}
      {isHovered && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: -1
        }}>
          {[...Array(10)].map((_, i) => (
            <Box 
              key={i}
              sx={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 5 + 5}s linear infinite`,
              }}
            />
          ))}
        </Box>
      )}

      {/* Icon with glow effect */}
      <Box
        sx={{
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : `${service.accentColor}15`,
          borderRadius: '50%',
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 2,
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? `0 0 25px ${service.accentColor}80` 
            : 'none',
        }}
      >
        <Box
          sx={{
            color: isHovered ? '#fff' : service.accentColor,
            fontSize: 50,
            transition: 'all 0.3s ease',
            animation: isHovered ? 'pulse 2s infinite' : 'none',
          }}
        >
          {service.icon}
        </Box>
      </Box>

      {/* Title with animated underline */}
      <Box sx={{ position: 'relative', marginBottom: 2 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            position: 'relative',
            zIndex: 1,
            color: isHovered ? '#fff' : service.accentColor,
            transition: 'color 0.3s ease',
          }}
        >
          {service.title}
        </Typography>
        <Box 
          sx={{
            position: 'absolute',
            bottom: -5,
            left: isHovered ? '0%' : '50%',
            width: isHovered ? '100%' : '0%',
            height: 2,
            backgroundColor: isHovered ? '#fff' : service.accentColor,
            transition: 'all 0.5s ease',
          }}
        />
      </Box>

      {/* Description with reveal animation */}
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'center',
          opacity: isHovered ? 1 : 0.8,
          transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all 0.3s ease 0.1s',
          fontWeight: isHovered ? 400 : 300,
        }}
      >
        {service.description}
      </Typography>

      {/* Feature list with staggered appearance */}
      {isHovered && (
        <Box 
          sx={{ 
            marginTop: 2,
            width: '100%',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.3s ease 0.2s',
          }}
        >
          <Box component="ul" sx={{ 
            listStyleType: 'none', 
            padding: 0,
            margin: '16px 0 0 0',
            textAlign: 'left'
          }}>
            {service.features.map((feature: string, i: number) => (
              <Box 
                component="li"
                key={i} 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 1,
                  opacity: 0,
                  animation: `fadeIn 0.5s forwards ${0.3 + (i * 0.1)}s`,
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    marginRight: 1.5,
                  }}
                />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* "Learn More" text */}
      <Typography 
        variant="button" 
        sx={{ 
          marginTop: 'auto',
          paddingTop: 2,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s ease 0.3s',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          '&::after': {
            content: '""',
            width: isHovered ? 20 : 0,
            height: 2,
            backgroundColor: '#fff',
            marginLeft: 1,
            transition: 'width 0.3s ease',
          }
        }}
      >
        LEARN MORE
      </Typography>
    </Box>
  );
};

const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Enhanced service data with more details
  const services: ServiceProps[] = [
    {
      title: 'Premium Fleet',
      description: 'Access our exclusive collection of luxury vehicles ranging from sleek sports cars to premium SUVs.',
      icon: <CarIcon />,
      accentColor: '#00bcd4',
      gradientStart: '#0277bd',
      gradientEnd: '#00bcd4',
      features: [
        'Latest models from top brands',
        'Regular maintenance & cleaning',
        'Various vehicle types available',
        'Contactless pickup options'
      ]
    },
    {
      title: 'Expert Maintenance',
      description: 'Our certified technicians ensure every vehicle is maintained to the highest standards.',
      icon: <BuildIcon />,
      accentColor: '#ff9800',
      gradientStart: '#f57c00',
      gradientEnd: '#ffb74d',
      features: [
        'Factory-trained specialists',
        'State-of-the-art diagnostics',
        'Genuine parts guarantee',
        'Transparent service reports'
      ]
    },
    {
      title: 'Concierge Support',
      description: 'Experience premium customer service with our 24/7 dedicated support team ready to assist you.',
      icon: <SupportIcon />,
      accentColor: '#4caf50',
      gradientStart: '#2e7d32',
      gradientEnd: '#4caf50',
      features: [
        'Available 24/7/365',
        'Roadside assistance',
        'Multi-language support',
        'Personal concierge services'
      ]
    },
    {
      title: 'Flexible Pricing',
      description: 'Choose from our variety of pricing plans designed to suit your budget and rental requirements.',
      icon: <MoneyIcon />,
      accentColor: '#9c27b0',
      gradientStart: '#7b1fa2',
      gradientEnd: '#ba68c8',
      features: [
        'Transparent pricing policy',
        'No hidden charges',
        'Loyalty rewards program',
        'Corporate account benefits'
      ]
    },
    {
      title: 'Express Service',
      description: 'Skip the wait with our streamlined rental process and fast vehicle delivery options.',
      icon: <SpeedIcon />,
      accentColor: '#e53935',
      gradientStart: '#d32f2f',
      gradientEnd: '#ef5350',
      features: [
        'Quick online reservations',
        'Mobile app check-in',
        'Express checkout process',
        'Vehicle delivery services'
      ]
    },
    {
      title: 'Total Protection',
      description: "Drive with confidence knowing you're covered by our comprehensive insurance and safety protocols.",
      icon: <SecurityIcon />,
      accentColor: '#3f51b5',
      gradientStart: '#303f9f',
      gradientEnd: '#5c6bc0',
      features: [
        'Comprehensive insurance',
        'Advanced safety features',
        'GPS tracking systems',
        '24/7 emergency response'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ef 100%)',
        padding: { xs: '60px 0', md: '100px 0' },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: 'linear-gradient(90deg, #00bcd4, #4caf50, #ff9800, #e53935, #3f51b5, #9c27b0)',
        },
      }}
    >
      {/* Animated background shapes */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        pointerEvents: 'none',
        zIndex: 0 
      }}>
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              backgroundColor: 'rgba(0, 188, 212, 0.03)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite alternate`,
              transformOrigin: 'center',
              zIndex: 0,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl">
        {/* Section header with animation */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            marginBottom: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            component="span" 
            sx={{ 
              display: 'inline-block',
              color: '#00bcd4', 
              fontWeight: 600,
              fontSize: '1.1rem',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 60,
                height: 2,
                backgroundColor: '#00bcd4',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
              }
            }}
          >
            WHAT WE OFFER
          </Typography>
          
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              mt: 3, 
              mb: 2,
              background: 'linear-gradient(90deg, #004d40, #00bcd4)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Premium Services
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              color: '#546e7a',
              fontWeight: 300,
            }}
          >
            Experience luxury and convenience with our comprehensive suite of services designed to elevate your journey.
          </Typography>
        </Box>
        
        {/* Services grid with responsive layout */}
        <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{ 
                height: { xs: 380, md: 420 },
              }}
            >
              <ServiceCard service={service} index={index} />
            </Grid>
          ))}
        </Grid>
        
        {/* Call to action banner */}
        <Box 
          sx={{ 
            marginTop: 10,
            padding: 5,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #00796b, #0277bd)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease 0.3s',
            zIndex: 1,
          }}
        >
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 0,
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: '-30%',
              left: '5%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              zIndex: 0,
            }}
          />
          
          <Grid container alignItems="center" spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Ready for a Premium Driving Experience?
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Join thousands of satisfied customers who have chosen SwiftRide for their luxury vehicle needs.
                Experience the difference today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: 'white',
                  color: '#00796b',
                  borderRadius: 2,
                  padding: '12px 24px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                    background: 'white',
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                BOOK YOUR RIDE NOW
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Add global animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default ServicesSection;