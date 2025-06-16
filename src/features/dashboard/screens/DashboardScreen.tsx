import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  useTheme,
  alpha,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TimelineIcon from '@mui/icons-material/Timeline';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MainLayout from '../../../components/layout/MainLayout';

// Neon theme colors
const neonGreen = '#39FF14';
const neonBlue = '#00BFFF';

// Styled components
const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha('#121212', 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(neonGreen, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 15px ${alpha(neonGreen, 0.5)}`,
    transform: 'translateY(-3px)',
  }
}));

const StatValue = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: 1,
  background: `-webkit-linear-gradient(45deg, ${neonGreen}, ${neonBlue})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

const PerformanceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: alpha('#121212', 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(neonGreen, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 15px ${alpha(neonGreen, 0.5)}`,
  }
}));

const RecentActivityCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha('#121212', 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(neonGreen, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 15px ${alpha(neonGreen, 0.5)}`,
  }
}));

// Sample data
const samplePortfolioData = [
  { name: 'Strategy Alpha', return: 7.8, status: 'active' },
  { name: 'Momentum Strategy', return: 4.2, status: 'paused' },
  { name: 'Deep Learning Model', return: -2.1, status: 'active' },
  { name: 'Mean Reversion', return: 9.3, status: 'active' }
];

export const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  
  return (
    <MainLayout>
      <Box sx={{ 
        padding: { xs: 2, md: 4 },
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(37, 38, 43, 0.7) 0%, rgba(10, 10, 10, 0.9) 100%)',
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            color: 'white',
            textShadow: `0 0 10px ${alpha(neonGreen, 0.5)}`,
            fontWeight: 'bold',
          }}
        >
          Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}
                >
                  PORTFOLIO VALUE
                </Typography>
                <StatValue>$142,384</StatValue>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: neonGreen, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: neonGreen }}>+6.3% this month</Typography>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}
                >
                  ACTIVE STRATEGIES
                </Typography>
                <StatValue>7</StatValue>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimelineIcon sx={{ color: neonBlue, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: neonBlue }}>3 performing above market</Typography>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}
                >
                  TOTAL RETURN
                </Typography>
                <StatValue>+18.7%</StatValue>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: neonGreen, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: neonGreen }}>Outperforming S&P by 4.2%</Typography>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}
                >
                  PORTFOLIO RISK
                </Typography>
                <StatValue>Moderate</StatValue>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EqualizerIcon sx={{ color: neonBlue, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: neonBlue }}>Sharpe Ratio 1.8</Typography>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
        </Grid>
        
        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Performance Section */}
          <Grid item xs={12} lg={8}>
            <PerformanceCard>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Portfolio Performance
              </Typography>
              <Box 
                sx={{ 
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px dashed ${alpha(neonGreen, 0.5)}`,
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Typography sx={{ color: alpha('white', 0.7) }}>
                  Performance Chart Placeholder
                  <br />
                  (Actual chart would be implemented here)
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Strategy Performance
                </Typography>
                
                <Grid container spacing={2}>
                  {samplePortfolioData.map((strategy, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box 
                        sx={{ 
                          p: 2, 
                          backgroundColor: alpha('#1e1e1e', 0.5),
                          borderRadius: 1,
                          border: `1px solid ${alpha(neonGreen, 0.2)}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography sx={{ color: 'white' }}>
                            {strategy.name}
                          </Typography>
                          <Typography 
                            sx={{ 
                              color: strategy.return >= 0 ? neonGreen : '#ff4757',
                              fontWeight: 'medium'
                            }}
                          >
                            {strategy.return >= 0 ? '+' : ''}{strategy.return}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: alpha('white', 0.6) }}>
                            Status: <span style={{ color: strategy.status === 'active' ? neonGreen : alpha('white', 0.6) }}>{strategy.status}</span>
                          </Typography>
                          <Button 
                            size="small" 
                            sx={{ 
                              color: neonGreen,
                              borderColor: neonGreen,
                              '&:hover': {
                                borderColor: neonGreen,
                                backgroundColor: alpha(neonGreen, 0.1)
                              },
                              py: 0.2,
                              textTransform: 'none'
                            }}
                            variant="outlined"
                          >
                            Details
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </PerformanceCard>
          </Grid>
          
          {/* Activity & Recommendations */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <RecentActivityCard>
                  <CardHeader 
                    title="Recent Activity" 
                    titleTypographyProps={{ 
                      color: 'white', 
                      variant: 'h6' 
                    }}
                  />
                  <Divider sx={{ backgroundColor: alpha(neonGreen, 0.3) }} />
                  <CardContent>
                    <Box sx={{ mb: 2, pb: 2, borderBottom: `1px solid ${alpha('white', 0.1)}` }}>
                      <Typography variant="body2" sx={{ color: neonGreen, mb: 0.5 }}>
                        Strategy Created
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha('white', 0.7) }}>
                        You created a new momentum strategy
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                        2 hours ago
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2, pb: 2, borderBottom: `1px solid ${alpha('white', 0.1)}` }}>
                      <Typography variant="body2" sx={{ color: neonGreen, mb: 0.5 }}>
                        Backtest Completed
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha('white', 0.7) }}>
                        MACD Crossover strategy backtest finished
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                        Yesterday at 14:35
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" sx={{ color: neonGreen, mb: 0.5 }}>
                        New Parameter Suggestion
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha('white', 0.7) }}>
                        AI suggests optimizing your RSI parameters
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                        2 days ago
                      </Typography>
                    </Box>
                  </CardContent>
                </RecentActivityCard>
              </Grid>
              
              <Grid item>
                <RecentActivityCard>
                  <CardHeader 
                    title="Quick Actions" 
                    titleTypographyProps={{ 
                      color: 'white', 
                      variant: 'h6' 
                    }}
                  />
                  <Divider sx={{ backgroundColor: alpha(neonGreen, 0.3) }} />
                  <CardContent>
                    <Button 
                      fullWidth 
                      variant="contained"
                      sx={{
                        mb: 2,
                        backgroundColor: neonGreen,
                        color: 'black',
                        '&:hover': {
                          backgroundColor: alpha(neonGreen, 0.8),
                        }
                      }}
                    >
                      Create New Strategy
                    </Button>
                    
                    <Button 
                      fullWidth 
                      variant="outlined"
                      sx={{
                        mb: 2,
                        borderColor: neonBlue,
                        color: neonBlue,
                        '&:hover': {
                          backgroundColor: alpha(neonBlue, 0.1),
                          borderColor: neonBlue
                        }
                      }}
                    >
                      Run Backtest
                    </Button>
                    
                    <Button 
                      fullWidth 
                      variant="outlined"
                      sx={{
                        borderColor: alpha('white', 0.5),
                        color: 'white',
                        '&:hover': {
                          backgroundColor: alpha('white', 0.1),
                          borderColor: 'white'
                        }
                      }}
                    >
                      View All Strategies
                    </Button>
                  </CardContent>
                </RecentActivityCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default DashboardScreen;
