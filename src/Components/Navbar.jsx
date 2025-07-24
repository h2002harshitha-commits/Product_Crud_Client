import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  FormControlLabel,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Tooltip,
  Fade,
  useScrollTrigger,
  Slide,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  AddBox,
  ViewList,
  Inventory,
  Person,
  Logout,
  ShoppingCart,
  LightMode,
  DarkMode,
  Close,
  Search,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

// Enhanced Dark/Light Switch
const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

// Glassmorphism AppBar
const GlassAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled
    ? theme.palette.mode === 'dark'
      ? 'rgba(18, 18, 18, 0.8)'
      : 'rgba(255, 255, 255, 0.8)'
    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
  backdropFilter: 'blur(20px)',
  borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
  boxShadow: scrolled
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 4px 30px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Hide AppBar on scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Enhanced Navigation Button
const NavButton = styled(Button)(({ theme, active }) => ({
  fontWeight: active ? 700 : 500,
  padding: '8px 16px',
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  color: active ? '#fff' : 'rgba(255, 255, 255, 0.9)',
  background: active
    ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
    : 'transparent',
  border: active ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
  backdropFilter: active ? 'blur(10px)' : 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

export default function Navbar({ user, setUser, mode, setMode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Add Product', path: '/insert', icon: <AddBox /> },
    { label: 'My Products', path: '/browse', icon: <Inventory /> },
    { label: 'Product List', path: '/products', icon: <ViewList /> },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    toast.success('Successfully logged out!');
    navigate('/login');
    handleMenuClose();
  };

  const handleModeToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  // Mobile Drawer Content
  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Drawer Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Drawer Header */}
      <Box
        sx={{
          p: 3,
          position: 'relative',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ShoppingCart sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            ShopCart
          </Typography>
          <IconButton
            onClick={handleMobileDrawerToggle}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <Close />
          </IconButton>
        </Box>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar
              src={`http://localhost:7000/uploads/product/${user?.profile}`}
              sx={{ width: 50, height: 50, mr: 2, border: '2px solid rgba(255, 255, 255, 0.3)' }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Welcome back!
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: 2, py: 3 }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleMobileDrawerToggle}
            sx={{
              mb: 1,
              borderRadius: 2,
              color: 'white',
              textDecoration: 'none',
              background: pathname === item.path
                ? 'rgba(255, 255, 255, 0.2)'
                : 'transparent',
              border: pathname === item.path
                ? '1px solid rgba(255, 255, 255, 0.3)'
                : '1px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateX(8px)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />

      {/* Mode Toggle & Settings */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="body2">Theme Mode</Typography>
          <FormControlLabel
            control={
              <StyledSwitch
                checked={mode === 'dark'}
                onChange={handleModeToggle}
                size="small"
              />
            }
            label=""
          />
        </Box>

        {user && (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <GlassAppBar position="fixed" scrolled={scrolled}>
          <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleMobileDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo and Title */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: { xs: 1, md: 0 },
                textDecoration: 'none',
                color: 'inherit',
                mr: { md: 4 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8))',
                  borderRadius: '50%',
                  p: 1,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingCart sx={{ fontSize: 30, color: '#667eea' }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                ShopCart
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                {navigationItems.map((item) => (
                  <NavButton
                    key={item.path}
                    component={Link}
                    to={item.path}
                    active={pathname === item.path}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>
            )}

            {/* Right Side Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Search Icon */}
              <Tooltip title="Search">
                <IconButton
                  color="inherit"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Search />
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  color="inherit"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Theme Toggle (Desktop) */}
              {!isMobile && (
                <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                  <IconButton
                    onClick={handleModeToggle}
                    color="inherit"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {mode === 'dark' ? <LightMode /> : <DarkMode />}
                  </IconButton>
                </Tooltip>
              )}

              {/* User Menu */}
              {user ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{
                        p: 0,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.6)',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Avatar
                        alt={user?.name}
                        src={`http://localhost:7000/uploads/product/${user?.profile}`}
                        sx={{
                          width: 40,
                          height: 40,
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                      elevation: 8,
                      sx: {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 3,
                        mt: 1.5,
                        minWidth: 200,
                        '& .MuiMenuItem-root': {
                          borderRadius: 2,
                          mx: 1,
                          my: 0.5,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                            transform: 'translateX(4px)',
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} to="/profile">
                      <Person sx={{ mr: 2, color: '#667eea' }} />
                      Profile
                    </MenuItem>
                    <MenuItem>
                      <Settings sx={{ mr: 2, color: '#667eea' }} />
                      Settings
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={handleLogout} sx={{ color: '#f44336' }}>
                      <Logout sx={{ mr: 2 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
                    color: '#667eea',
                    fontWeight: 600,
                    borderRadius: 3,
                    px: 3,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.9))',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </GlassAppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerToggle}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
}