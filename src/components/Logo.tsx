import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../assets/logo.png'; // Direct reference to top-level assets

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true,
  textColor = '#39FF14' 
}) => {
  // Define sizes for different variants
  const sizes = {
    small: { img: 32, text: '1.2rem' },
    medium: { img: 48, text: '1.5rem' },
    large: { img: 64, text: '2rem' },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <img 
        src={logo} 
        alt="Strategiz Logo" 
        style={{ 
          height: sizes[size].img, 
          width: 'auto',
        }} 
      />
      
      {showText && (
        <Typography 
          variant="h6" 
          component="span"
          sx={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontSize: sizes[size].text,
            fontWeight: 600,
            color: textColor,
            textShadow: `0 0 10px ${textColor}88`,
            letterSpacing: '0.05em',
          }}
        >
          Strategiz
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
