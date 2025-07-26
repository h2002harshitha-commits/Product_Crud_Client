// Make sure you have MUI v5+ and imports set up
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Container, Grid, Paper, Card,
  CardContent, Fade, Zoom, IconButton, useTheme, useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, LocalShipping, TrendingUp, Security,
  Speed, ArrowForward, Star, Verified, Support,
  Facebook, Twitter, Instagram, LinkedIn,
} from '@mui/icons-material';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Use theme-based background colors for cards/paper
  const getBackground = (baseColor) =>
    theme.palette.mode === 'dark'
      ? 'rgba(30, 30, 30, 0.6)'
      : `linear-gradient(135deg, rgba(${baseColor}, 0.08), rgba(${baseColor}, 0.02))`;

  const getBorder = (baseColor) =>
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : `1px solid rgba(${baseColor}, 0.2)`;

  const features = [
    {
      icon: <ShoppingCart sx={{ fontSize: 60 }} />,
      title: 'Easy Shopping',
      description: 'Seamless cart experience with one-click purchasing',
      color: 'f093fb',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 60 }} />,
      title: 'Fast Delivery',
      description: 'Lightning-fast delivery with real-time tracking',
      color: '4facfe',
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      title: 'Secure Payments',
      description: 'Bank-level security for all your transactions',
      color: '43e97b',
    },
    {
      icon: <Speed sx={{ fontSize: 60 }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance for the best user experience',
      color: 'fa709a',
    },
    {
      icon: <Support sx={{ fontSize: 60 }} />,
      title: '24/7 Support',
      description: 'Always here to help with dedicated customer support',
      color: 'ffecd2',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: <Star /> },
    { number: '50K+', label: 'Products Sold', icon: <TrendingUp /> },
    { number: '99.9%', label: 'Uptime', icon: <Verified /> },
    { number: '24/7', label: 'Support', icon: <Support /> },
  ];

  // **HERO SECTION**
  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(50, 60, 120, 0.8), rgba(40, 35, 70, 0.9))'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9), rgba(240, 147, 251, 0.9))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.7,
          }}
        />
        <Container
          maxWidth="md"
          sx={{
            textAlign: 'center',
            zIndex: 1,
            py: { xs: 8, md: 10 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Fade in={isVisible} timeout={1000}>
            <Box>
              {/* <Typography
                variant="h1"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  background: 'linear-gradient(45deg, #fff, #f0f8ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  letterSpacing: { sm: '-0.02em' },
                  lineHeight: 1.2,
                }}
              >
                Shop Smarter,
                <br />
                Live Better
              </Typography> */}

<Typography
  variant="h1"
  sx={{
    fontWeight: theme.typography.fontWeightBold,
    mb: 3,
    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #fff, #ccc)'
      : 'linear-gradient(45deg, #fff, #f0f8ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
    letterSpacing: { sm: '-0.02em' },
    lineHeight: 1.2,
  }}
>
  Shop Smarter,
  <br />
  Live Better
</Typography>


              <Typography
                variant={isMobile ? 'body1' : 'h5'}
                sx={{
                  mb: { xs: 4, md: 6 },
                  px: { xs: 1, md: 8 },
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: theme.typography.fontWeightLight,
                }}
              >
                Experience the future of online shopping with our AI-powered platform.
                Discover millions of products, enjoy lightning-fast delivery, and shop with confidence.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                  justifyContent: 'center',
                }}
              >
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    fontWeight: theme.typography.fontWeightBold,
                    px: 4,
                    py: { xs: 1.2, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    borderRadius: 6,
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                    minWidth: { xs: '100%', sm: 200 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #764ba2, #667eea)',
                      boxShadow: '0 8px 28px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outlined"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    fontWeight: 600,
                    px: 4,
                    py: { xs: 1.2, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    borderRadius: 6,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    minWidth: { xs: '100%', sm: 200 },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderColor: '#fff',
                      color: '#fff',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Fade>
          <Fade in={isVisible} timeout={1500}>
            <Grid
              container
              spacing={3}
              sx={{
                mt: { xs: 6, sm: 8 },
                justifyContent: 'center',
              }}
            >
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Paper
                    elevation={theme.palette.mode === 'dark' ? 2 : 0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backdropFilter: 'blur(16px)',
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(20, 20, 20, 0.6)'
                        : 'rgba(255, 255, 255, 0.15)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(40, 40, 40, 0.6)'
                          : 'rgba(255, 255, 255, 0.25)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: theme.typography.fontWeightBold,
                        color: '#fff',
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.8)'
                          : 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: theme.palette.background.default,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={2000}>
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: 3,
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
                color="text.secondary"
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Discover the features that make us the preferred choice for millions of shoppers worldwide
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Zoom in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      height: '100%',
                      background: getBackground(feature.color),
                      border: getBorder(feature.color),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 24px rgba(${feature.color}, 0.2)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          color: `#${feature.color}`,
                          mb: 3,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: theme.typography.fontWeightBold,
                          mb: 2,
                          color: theme.palette.text.primary,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.secondary}
                        sx={{
                          lineHeight: 1.6,
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

      {/* CTA BANNER */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: theme.palette.mode === 'dark'
            ? '#1a1a1a'
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff',
          position: 'relative',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={2500}>
            <Box>
              {/* <Typography
                variant="h2"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: 3,
                  color: '#fff',
                }}
              >
                Ready to Transform Your Shopping?
              </Typography> */}

<Typography
  variant="h2"
  sx={{
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    mb: 2,
    textAlign: 'center',
  }}
>
  Ready to Transform Your Shopping?
</Typography>


              {/* <Typography
                variant="h5"
                color="rgba(255, 255, 255, 0.9)"
                sx={{
                  mb: 6,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Join millions of satisfied customers and experience the future of online shopping today.
              </Typography> */}

<Typography
  variant="h6"
  sx={{
    color: theme.palette.text.primary,
    mb: 4,
    maxWidth: '600px',
    mx: 'auto',
    textAlign: 'center',
  }}
>
  Join millions of satisfied customers and experience the future of online shopping today.
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
                  fontWeight: theme.typography.fontWeightBold,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: 6,
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? '#f8f9fa'
                      : '#e6e9ed',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                ShopCart
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.grey[300]}
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                Revolutionizing shopping with cutting-edge technology and exceptional service.
              </Typography>
              {/* <Box sx={{ display: 'flex', gap: 2 }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      color: theme.palette.grey[400],
                      '&:hover': {
                        color: '#667eea',
                        backgroundColor: theme.palette.grey[800],
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box> */}
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.grey[100],
                }}
              >
                Company
              </Typography>
              <Box>
                {['About', 'Careers', 'Press', 'Blog'].map((item) => (
                  <Typography
                    key={item}
                    variant="body1"
                    color={theme.palette.grey[400]}
                    sx={{
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': { color: '#667eea' },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.grey[100],
                }}
              >
                Support
              </Typography>
              <Box>
                {['Help Center', 'Contact Us', 'Privacy', 'Terms'].map((item) => (
                  <Typography
                    key={item}
                    variant="body1"
                    color={theme.palette.grey[400]}
                    sx={{
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': { color: '#667eea' },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.grey[100],
                }}
              >
                Newsletter
              </Typography>
              <Typography color={theme.palette.grey[400]} sx={{ mb: 2 }}>
                Stay updated with latest offers and products.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box
                  component="input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.grey[800],
                    border: '1px solid rgba(255,255,255,0.1)',
                    p: 1.5,
                    borderRadius: 2,
                    color: theme.palette.grey[100],
                    '&::placeholder': {
                      color: theme.palette.grey[500],
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
                    borderRadius: 2,
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
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color={theme.palette.grey[500]}>
              © 2025 ShopCart. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
