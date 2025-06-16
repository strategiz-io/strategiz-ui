import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  useTheme,
  alpha,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CodeIcon from '@mui/icons-material/Code';
import AutomationIcon from '@mui/icons-material/SmartToy';
import CommunityIcon from '@mui/icons-material/People';
import { keyframes } from '@mui/system';
import Logo from '../../../components/Logo';

// Define color palette
const neonGreen = '#39FF14';
const neonBlue = '#00ff9f';
const deepBlue = '#0A1929';
const accentPurple = '#8A2BE2';
const white = '#FFFFFF';

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha(neonGreen, 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${alpha(neonGreen, 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha(neonGreen, 0)}; }
`;

const gradientBg = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

interface LandingScreenProps {
  isAuthenticated?: boolean;
  onGetStarted: () => void;
  onExploreStrategies: () => void;
  onNavigateToFeature: (path: string) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  isAuthenticated = false,
  onGetStarted,
  onExploreStrategies,
  onNavigateToFeature,
}) => {
  const theme = useTheme();
  
  const features = [
    {
      title: 'AI-Powered Strategy Creation',
      description: 'Describe your trading goals and risk tolerance in plain language. Our platform translates your vision into executable strategies.',
      icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
      path: '/strategies'
    },
    {
      title: 'Automated Trading Execution',
      description: 'Set it and forget it. Strategiz executes your trading strategy, making trades and rebalancing automatically.',
      icon: <AutomationIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard'
    },
    {
      title: 'Discover Pre-Built Strategies',
      description: 'Browse our marketplace of ready-to-deploy strategies across various categories and investment styles.',
      icon: <ShowChartIcon sx={{ fontSize: 40 }} />,
      path: '/marketplace'
    },
    {
      title: 'No-Code Strategy Builder',
      description: 'Use our visual editor to create sophisticated trading algorithms without writing a single line of code.',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      path: '/labs'
    },
    {
      title: 'Market-Reactive Portfolio',
      description: 'Trade based on data and market movements, not emotions or sensationalized news.',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      path: '/portfolio'
    },
    {
      title: 'Community & Sharing',
      description: 'Share your strategies with others or discover what the community is creating. Learn, adapt, and improve together.',
      icon: <CommunityIcon sx={{ fontSize: 40 }} />,
      path: '/marketplace'
    }
  ];

  // No business logic - we'll pass a prop to redirect instead
  React.useEffect(() => {
    // This is now simplified without direct access to user data
    // The parent component will handle redirection if needed
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${deepBlue} 0%, #000000 100%)`,
        backgroundSize: '400% 400%',
        animation: `${gradientBg} 15s ease infinite`,
        color: white,
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            py: { xs: 6, md: 10 },
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Logo size="large" />
            </Box>
            <Typography
              variant="h5"
              paragraph
              sx={{
                maxWidth: '800px',
                margin: '0 auto',
                mb: 5,
                px: { xs: 2, sm: 4 },
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                color: 'grey.300',
                lineHeight: 1.6,
              }}
            >
              Build, backtest, and execute sophisticated trading algorithms with zero coding required.
              Take control of your investments with data-driven strategies that react to the market.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
                  borderRadius: '8px',
                  boxShadow: `0 4px 20px ${alpha(neonGreen, 0.3)}`,
                  '&:hover': {
                    background: `linear-gradient(90deg, ${neonBlue}, ${neonGreen})`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 25px ${alpha(neonGreen, 0.5)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={onExploreStrategies}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: white,
                  borderColor: alpha(white, 0.3),
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: white,
                    backgroundColor: alpha(white, 0.05),
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Strategies
              </Button>
            </Stack>
          </Box>
          {/* Mock UI Preview */}
          <Paper
            elevation={24}
            sx={{
              maxWidth: '900px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              background: alpha(deepBlue, 0.7),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(neonGreen, 0.2)}`,
              transform: 'perspective(1000px) rotateX(5deg)',
              boxShadow: `0 20px 80px ${alpha(neonGreen, 0.2)}`,
            }}
          >
            <Box
              sx={{
                height: { xs: '200px', sm: '300px', md: '400px' },
                background: `linear-gradient(135deg, ${alpha(deepBlue, 0.9)} 0%, ${alpha('#000', 0.7)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: alpha(white, 0.7),
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                Interactive Strategy Builder Preview
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Features Section */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: white,
            mb: 6,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
              borderRadius: '2px',
            }
          }}
        >
          Powerful Features
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 8, sm: 10 },
            justifyItems: 'center'
          }}
        >
          {features.map((feature, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Card
                onClick={() => onNavigateToFeature(feature.path)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: alpha(deepBlue, 0.5),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(neonGreen, 0.1)}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 10px 30px ${alpha(neonGreen, 0.2)}`,
                    '& .icon': {
                      color: neonGreen,
                      transform: 'scale(1.1) translateY(-5px)',
                    },
                    '& .title': {
                      background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                    '&:before': {
                      opacity: 1,
                    }
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: { xs: 3, sm: 4 } }}>
                  <Box
                    className="icon"
                    sx={{
                      color: 'grey.300',
                      mb: { xs: 2, sm: 3 },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className="title"
                    sx={{
                      color: white,
                      fontWeight: 700,
                      transition: 'all 0.3s ease-in-out',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'grey.400',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Call to action Footer */}
        <Box 
          sx={{ 
            textAlign: 'center',
            py: { xs: 6, sm: 8 },
            px: { xs: 2, sm: 0 },
            borderTop: `1px solid ${alpha(neonGreen, 0.1)}`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: white,
              mb: 3,
            }}
          >
            Ready to Transform Your Trading?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'grey.300',
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.6,
            }}
          >
            Join thousands of traders who are already leveraging our platform to create data-driven strategies that respond to market conditions in real-time.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              py: 1.5,
              px: 5,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
              borderRadius: '8px',
              boxShadow: `0 4px 20px ${alpha(neonGreen, 0.3)}`,
              '&:hover': {
                background: `linear-gradient(90deg, ${neonBlue}, ${neonGreen})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 25px ${alpha(neonGreen, 0.5)}`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingScreen;
