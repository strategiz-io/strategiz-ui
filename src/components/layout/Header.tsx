import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  alpha,
  Tabs,
  Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Logo from '../Logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../features/auth/types';

// Neon theme colors
const neonGreen = '#39FF14';
const neonBlue = '#00BFFF';

interface HeaderProps {
  isAuthenticated: boolean;
  user?: User | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated = false, 
  user = null,
  onLogout
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Function to determine active tab based on current path
  const getActiveTab = () => {
    if (location.pathname.startsWith('/dashboard')) return 0;
    if (location.pathname.startsWith('/labs')) return 1;
    if (location.pathname.startsWith('/strategies')) return 2;
    if (location.pathname.startsWith('/portfolio')) return 3;
    return false;
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  
  const handleLogout = () => {
    handleCloseUserMenu();
    if (onLogout) {
      onLogout();
    }
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      handleNavigate('/dashboard');
    } else if (newValue === 1) {
      handleNavigate('/labs');
    } else if (newValue === 2) {
      handleNavigate('/strategies');
    } else if (newValue === 3) {
      handleNavigate('/portfolio');
    }
  };
  
  const renderUserMenu = () => (
    <>
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{ ml: 1 }}
      >
        {user?.avatar ? (
          <Avatar 
            src={user.avatar}
            alt={user.fullName || user.email} 
            sx={{ 
              border: `2px solid ${neonGreen}`,
              boxShadow: `0 0 10px ${alpha(neonGreen, 0.5)}`,
            }}
          />
        ) : (
          <AccountCircleIcon 
            sx={{ 
              color: neonGreen,
              fontSize: 40,
              filter: `drop-shadow(0 0 5px ${alpha(neonGreen, 0.7)})`,
            }}
          />
        )}
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#121212',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            boxShadow: `0 0 15px ${alpha(neonGreen, 0.3)}`,
            border: `1px solid ${alpha(neonGreen, 0.5)}`,
            mt: 1.5,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigate('/profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/dashboard')}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/settings')}>
          Settings
        </MenuItem>
        <Divider sx={{ my: 1, borderColor: alpha(neonGreen, 0.3) }} />
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  const mainNavItems = [
    { label: 'Explore', path: '/explore' },
    { label: 'Learn', path: '/learn' },
    { label: 'Community', path: '/community' },
  ];

  const renderNavItems = () => (
    <>
      {mainNavItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => handleNavigate(item.path)}
          sx={{
            color: 'white',
            mx: 1,
            '&:hover': {
              color: neonGreen,
              textShadow: `0 0 10px ${neonGreen}`
            },
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), transparent)',
        boxShadow: 'none',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{ 
            flexGrow: 0,
            mr: 2,
            cursor: 'pointer',
          }}
          onClick={() => handleNavigate('/')}
        >
          <Logo size="medium" />
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {!isAuthenticated ? renderNavItems() : (
              <Tabs 
                value={getActiveTab()} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: neonGreen,
                    boxShadow: `0 0 8px ${neonGreen}`,
                    height: 3
                  },
                }}
              >
                <Tab 
                  icon={<DashboardIcon />} 
                  iconPosition="start" 
                  label="Dashboard" 
                  sx={{
                    color: 'white',
                    '&.Mui-selected': {
                      color: neonGreen,
                      textShadow: `0 0 5px ${neonGreen}`,
                    },
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                />
                <Tab 
                  icon={<ScienceIcon />} 
                  iconPosition="start" 
                  label="Labs" 
                  sx={{
                    color: 'white',
                    '&.Mui-selected': {
                      color: neonGreen,
                      textShadow: `0 0 5px ${neonGreen}`,
                    },
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                />
                <Tab 
                  icon={<TrendingUpIcon />} 
                  iconPosition="start" 
                  label="Strategies" 
                  sx={{
                    color: 'white',
                    '&.Mui-selected': {
                      color: neonGreen,
                      textShadow: `0 0 5px ${neonGreen}`,
                    },
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                />
                <Tab 
                  icon={<AccountBalanceIcon />} 
                  iconPosition="start" 
                  label="Portfolio" 
                  sx={{
                    color: 'white',
                    '&.Mui-selected': {
                      color: neonGreen,
                      textShadow: `0 0 5px ${neonGreen}`,
                    },
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                />
              </Tabs>
            )}
          </Box>
        )}

        {/* Authentication Buttons or User Menu */}
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            renderUserMenu()
          ) : (
            !isMobile ? (
              <>
                <Button 
                  variant="outlined"
                  onClick={handleSignIn}
                  sx={{
                    color: neonGreen,
                    borderColor: neonGreen,
                    mr: 2,
                    '&:hover': {
                      borderColor: neonGreen,
                      backgroundColor: alpha(neonGreen, 0.1),
                      boxShadow: `0 0 10px ${neonGreen}`
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleSignUp}
                  sx={{
                    backgroundColor: neonGreen,
                    color: 'black',
                    '&:hover': {
                      backgroundColor: alpha(neonGreen, 0.8),
                      boxShadow: `0 0 15px ${neonGreen}`
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : null
          )}
          
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                ml: 2,
                color: neonGreen,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 300,
            backgroundColor: '#121212',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            boxShadow: `-5px 0 20px ${alpha(neonGreen, 0.2)}`,
            borderLeft: `1px solid ${alpha(neonGreen, 0.3)}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size="small" />
          <IconButton onClick={handleDrawerToggle} sx={{ color: neonGreen }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: alpha(neonGreen, 0.3) }} />
        <List>
          {isAuthenticated ? (
            <>
              <ListItem 
                onClick={() => handleNavigate('/dashboard')}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.1),
                  },
                  cursor: 'pointer',
                  paddingY: 1,
                  backgroundColor: location.pathname.startsWith('/dashboard') ? alpha(neonGreen, 0.15) : 'transparent'
                }}
              >
                <DashboardIcon sx={{ marginRight: 1, color: neonGreen }} />
                <ListItemText 
                  primary="Dashboard" 
                  sx={{ 
                    color: location.pathname.startsWith('/dashboard') ? neonGreen : 'white',
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItem>
              <ListItem 
                onClick={() => handleNavigate('/labs')}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.1),
                  },
                  cursor: 'pointer',
                  paddingY: 1,
                  backgroundColor: location.pathname.startsWith('/labs') ? alpha(neonGreen, 0.15) : 'transparent'
                }}
              >
                <ScienceIcon sx={{ marginRight: 1, color: neonGreen }} />
                <ListItemText 
                  primary="Labs" 
                  sx={{ 
                    color: location.pathname.startsWith('/labs') ? neonGreen : 'white',
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItem>
              <ListItem 
                onClick={() => handleNavigate('/strategies')}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.1),
                  },
                  cursor: 'pointer',
                  paddingY: 1,
                  backgroundColor: location.pathname.startsWith('/strategies') ? alpha(neonGreen, 0.15) : 'transparent'
                }}
              >
                <TrendingUpIcon sx={{ marginRight: 1, color: neonGreen }} />
                <ListItemText 
                  primary="Strategies" 
                  sx={{ 
                    color: location.pathname.startsWith('/strategies') ? neonGreen : 'white',
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItem>
              
              <ListItem 
                onClick={() => handleNavigate('/portfolio')}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.1),
                  },
                  cursor: 'pointer',
                  paddingY: 1,
                  backgroundColor: location.pathname.startsWith('/portfolio') ? alpha(neonGreen, 0.15) : 'transparent'
                }}
              >
                <AccountBalanceIcon sx={{ marginRight: 1, color: neonGreen }} />
                <ListItemText 
                  primary="Portfolio" 
                  sx={{ 
                    color: location.pathname.startsWith('/portfolio') ? neonGreen : 'white',
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItem>
              <Divider sx={{ borderColor: alpha(neonGreen, 0.3), my: 1 }} />
            </>
          ) : (
            mainNavItems.map((item) => (
              <ListItem 
                key={item.path} 
                onClick={() => handleNavigate(item.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.1),
                  },
                  cursor: 'pointer',
                  paddingY: 1
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    color: 'white',
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItem>
            ))
          )}
        </List>
        
        <Divider sx={{ borderColor: alpha(neonGreen, 0.3), my: 1 }} />
        
        {!isAuthenticated && (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              fullWidth
              variant="outlined"
              onClick={handleSignIn}
              sx={{
                color: neonGreen,
                borderColor: neonGreen,
                '&:hover': {
                  borderColor: neonGreen,
                  backgroundColor: alpha(neonGreen, 0.1),
                }
              }}
            >
              Sign In
            </Button>
            <Button 
              fullWidth
              variant="contained"
              onClick={handleSignUp}
              sx={{
                backgroundColor: neonGreen,
                color: 'black',
                '&:hover': {
                  backgroundColor: alpha(neonGreen, 0.8),
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Header;
