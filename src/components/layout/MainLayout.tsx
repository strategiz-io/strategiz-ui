import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useAppSelector } from '../../store';
import { selectIsAuthenticated, selectUser } from '../../features/auth/redux/authSlice';
import { useAuthController } from '../../features/auth/hooks/useAuthController';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  hideFooter = false
}) => {
  // Get auth state from Redux
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  
  // Get logout functionality from auth controller
  const { handleSignOut } = useAuthController();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Header 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={handleSignOut} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      
      {!hideFooter && <Footer />}
    </Box>
  );
};

export default MainLayout;
