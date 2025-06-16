import React from 'react';
import { Box, Container, Paper, Typography, alpha } from '@mui/material';
import Logo from '../../../components/Logo';

// Define the neonGreen color
const neonGreen = '#39FF14';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = 'Welcome', 
  subtitle = 'Sign in to your account to continue'
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, #0A1929 0%, #000000 100%)`,
        backgroundSize: '400% 400%',
        position: 'relative',
        py: 4,
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: `radial-gradient(circle, ${alpha(neonGreen, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(neonGreen, 0.2)}`,
            borderRadius: '12px',
            boxShadow: `0 8px 32px ${alpha(neonGreen, 0.15)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Form Title */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              color: neonGreen,
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 600,
              textShadow: `0 0 10px ${alpha(neonGreen, 0.5)}`,
              letterSpacing: '0.05em',
              mb: 1,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                color: 'grey.400',
                mb: 4,
                maxWidth: '80%',
              }}
            >
              {subtitle}
            </Typography>
          )}

          {/* Authentication Form */}
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
