import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Fade,
  Zoom,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  LocalShipping,
  TrendingUp,
  Security,
  Speed,
  ArrowForward,
  Star,
  Verified,
  Support,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Search sx={{ fontSize: 60 }} />,
      title: 'Smart Search',
      description: 'AI-powered search to find exactly what you need in seconds',
      color: '#667eea',
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 60 }} />,
      title: 'Easy Shopping',
      description: 'Seamless cart experience with one-click purchasing',
      color: '#f093fb',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 60 }} />,
      title: 'Fast Delivery',
      description: 'Lightning-fast delivery with real-time tracking',
      color: '#4facfe',
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      title: 'Secure Payments',
      description: 'Bank-level security for all your transactions',
      color: '#43e97b',
    },
    {
      icon: <Speed sx={{ fontSize: 60 }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance for the best user experience',
      color: '#fa709a',
    },
    {
      icon: <Support sx={{ fontSize: 60 }} />,
      title: '24/7 Support',
      description: 'Always here to help with dedicated customer support',
      color: '#ffecd2',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: <Star /> },
    { number: '50K+', label: 'Products Sold', icon: <TrendingUp /> },
    { number: '99.9%', label: 'Uptime', icon: <Verified /> },
    { number: '24/7', label: 'Support', icon: <Support /> },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: `
            linear-gradient(135deg, 
              rgba(102, 126, 234, 0.9) 0%, 
              rgba(118, 75, 162, 0.9) 50%,
              rgba(240, 147, 251, 0.9) 100%
            ),
            url(pexels-mccutcheon-1191710.jpg)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
            `,
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(-10px, -10px) rotate(0deg)' },
              '50%': { transform: 'translate(10px, 10px) rotate(180deg)' },
            },
          }}
        />

        {/* Content */}
        <Container
          maxWidth="lg"
          sx={{
            zIndex: 2,
            textAlign: 'center',
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Fade in={isVisible} timeout={1000}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
                  background: 'linear-gradient(45deg, #fff, #f0f8ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Shop Smarter,
                <br />
                Live Better
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  px: { xs: 2, sm: 4, md: 8 },
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  lineHeight: 1.6,
                  fontWeight: 300,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                Experience the future of online shopping with our AI-powered platform.
                Discover millions of products, enjoy lightning-fast delivery, and shop
                with confidence.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    fontWeight: 700,
                    px: { xs: 4, sm: 6 },
                    py: 2,
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    borderRadius: 6,
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    minWidth: { xs: 250, sm: 200 },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #764ba2, #667eea)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
                      transform: 'translateY(-4px) scale(1.05)',
                    },
                  }}
                >
                  Start Shopping
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: '#fff',
                    fontWeight: 600,
                    px: { xs: 4, sm: 6 },
                    py: 2,
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    borderRadius: 6,
                    borderWidth: 2,
                    minWidth: { xs: 250, sm: 200 },
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Fade>

          {/* Stats Section */}
          <Fade in={isVisible} timeout={1500}>
            <Grid container spacing={3} sx={{ mt: 8 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      backdropFilter: 'blur(20px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      p: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box sx={{ color: '#fff', mb: 1 }}>{stat.icon}</Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: '#fff',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: { xs: '0.8rem', md: '1rem' },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={2000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Why Choose ShopCart?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                }}
              >
                Discover the features that make us the preferred choice for millions
                of shoppers worldwide
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Zoom in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                      border: `2px solid ${feature.color}30`,
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 20px 60px ${feature.color}40`,
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .feature-bg': {
                          transform: 'scale(1.1)',
                          opacity: 0.1,
                        },
                      },
                    }}
                  >
                    {/* Background decoration */}
                    <Box
                      className="feature-bg"
                      sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
                        background: `radial-gradient(circle, ${feature.color}20, transparent)`,
                        borderRadius: '50%',
                        transition: 'all 0.4s ease',
                        opacity: 0.05,
                      }}
                    />

                    <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
                      <Box
                        className="feature-icon"
                        sx={{
                          color: feature.color,
                          mb: 3,
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: '#1a1a1a',
                          fontSize: { xs: '1.3rem', md: '1.5rem' },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Animation */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
            animation: 'pulse 4s ease-in-out infinite alternate',
            '@keyframes pulse': {
              '0%': { opacity: 0.5 },
              '100%': { opacity: 1 },
            },
          }}
        />

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={2500}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: '#fff',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Ready to Transform Your Shopping?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 6,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                }}
              >
                Join millions of satisfied customers and experience the future of online shopping today
              </Typography>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: '#fff',
                  color: '#667eea',
                  fontWeight: 700,
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  borderRadius: 6,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ShopCart
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                }}
              >
                Revolutionizing the way you shop online with cutting-edge technology
                and unparalleled customer service.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        color: '#fff',
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Company
              </Typography>
              {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#667eea' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Support
              </Typography>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#667eea' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Newsletter
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Stay updated with our latest offers and products
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  component="input"
                  placeholder="Enter your email"
                  sx={{
                    flex: 1,
                    p: 1.5,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus': {
                      outline: 'none',
                      borderColor: '#667eea',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    px: 3,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #764ba2, #667eea)',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              © 2025 ShopCart. All rights reserved. Made with ❤️ for amazing shoppers.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}