import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: (theme) => theme.palette.background.default,
        zIndex: 9999,
      }}
    >
      <CircularProgress 
        size={60}
        sx={{ 
          color: '#39FF14', // Neon green
          marginBottom: 2,
          boxShadow: '0 0 15px #39FF14',
        }}
      />
      <Typography 
        variant="h6"
        sx={{ 
          color: '#39FF14', // Neon green
          textShadow: '0 0 5px #39FF14',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;
