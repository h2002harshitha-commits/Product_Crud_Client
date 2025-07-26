import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  const theme = useTheme(); // Access the current theme mode

  // Hide on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        background: isDark
          ? 'linear-gradient(to right, #212121, #0f010fff)'
          : 'linear-gradient(to right, #1976d2, #0d47a1)',
        color: isDark ? '#f5f5f5' : 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        &copy; {new Date().getFullYear()} My Product Website
      </Typography>
      <Typography variant="caption" display="block">
        Made with ❤️ using React & Material UI
      </Typography>
    </Box>
  );
}
