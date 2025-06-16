import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography,
  Card, 
  CardContent, 
  CardMedia,
  CardActionArea,
  Button,
  Chip,
  useTheme,
  alpha,
  Divider,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ScienceIcon from '@mui/icons-material/Science';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MainLayout from '../../../components/layout/MainLayout';

// Neon theme colors
const neonGreen = '#39FF14';
const neonBlue = '#00BFFF';
const neonPurple = '#bf00ff';

// Styled components
const LabCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha('#121212', 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(neonGreen, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 15px ${alpha(neonGreen, 0.5)}`,
    transform: 'translateY(-5px)',
  }
}));

const ExperimentCard = styled(Paper)(({ theme }) => ({
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

// Sample data for lab projects
const labProjects = [
  {
    id: 1,
    title: "AI Strategy Generator",
    description: "Use advanced AI to automatically generate trading strategies based on market patterns and historical data.",
    image: "ai-strategy.jpg",
    category: "AI",
    progress: 65,
    isNew: true
  },
  {
    id: 2,
    title: "Neural Network Lab",
    description: "Experiment with deep learning models for financial predictions and market analysis.",
    image: "neural-network.jpg",
    category: "Machine Learning",
    progress: 80,
    isNew: false
  },
  {
    id: 3,
    title: "Strategy Backtesting Sandbox",
    description: "Test your strategies with advanced backtesting tools and visualization.",
    image: "backtesting.jpg",
    category: "Testing",
    progress: 100,
    isNew: false
  },
  {
    id: 4,
    title: "Market Data Explorer",
    description: "Advanced visualization and exploration of market data with correlation analysis.",
    image: "market-data.jpg",
    category: "Data",
    progress: 90,
    isNew: false
  }
];

// Sample data for ongoing experiments
const ongoingExperiments = [
  {
    name: "Sentiment Analysis Model",
    progress: 45,
    category: "AI",
    lastUpdated: "2 hours ago"
  },
  {
    name: "Volatility Prediction",
    progress: 78,
    category: "Machine Learning",
    lastUpdated: "Yesterday"
  },
  {
    name: "Pattern Recognition Test",
    progress: 92,
    category: "Analysis",
    lastUpdated: "3 days ago"
  }
];

export const LabsScreen: React.FC = () => {
  const theme = useTheme();
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'AI': return neonPurple;
      case 'Machine Learning': return neonBlue;
      case 'Data': return '#FF5733';
      case 'Testing': return '#FFD700';
      case 'Analysis': return '#FF4500';
      default: return neonGreen;
    }
  };
  
  return (
    <MainLayout>
      <Box sx={{ 
        padding: { xs: 2, md: 4 },
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(37, 38, 43, 0.7) 0%, rgba(10, 10, 10, 0.9) 100%)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ScienceIcon sx={{ 
            fontSize: 36, 
            color: neonGreen,
            filter: `drop-shadow(0 0 5px ${neonGreen})`,
            mr: 2 
          }} />
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white',
              textShadow: `0 0 10px ${alpha(neonGreen, 0.5)}`,
              fontWeight: 'bold',
            }}
          >
            Labs
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            color: alpha('white', 0.7),
            maxWidth: 800
          }}
        >
          Welcome to Strategiz Labs, where cutting-edge research and development takes place. 
          Experiment with new strategies, test AI models, and discover innovative investment approaches.
        </Typography>
        
        {/* Featured Labs Projects */}
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <LightbulbIcon sx={{ mr: 1, color: neonGreen }} />
          Featured Projects
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {labProjects.map(project => (
            <Grid item xs={12} sm={6} md={3} key={project.id}>
              <LabCard>
                <CardActionArea>
                  <Box sx={{ 
                    height: 140, 
                    backgroundColor: alpha(getCategoryColor(project.category), 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {project.category === 'AI' && <PsychologyIcon sx={{ fontSize: 60, color: getCategoryColor(project.category) }} />}
                    {project.category === 'Machine Learning' && <AutoGraphIcon sx={{ fontSize: 60, color: getCategoryColor(project.category) }} />}
                    {project.category === 'Testing' && <CodeIcon sx={{ fontSize: 60, color: getCategoryColor(project.category) }} />}
                    {project.category === 'Data' && <AutoGraphIcon sx={{ fontSize: 60, color: getCategoryColor(project.category) }} />}
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div" 
                        sx={{ color: 'white', fontWeight: 'medium' }}
                      >
                        {project.title}
                      </Typography>
                      {project.isNew && (
                        <Chip 
                          label="NEW" 
                          size="small" 
                          sx={{ 
                            backgroundColor: neonGreen, 
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            height: 20
                          }} 
                        />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: alpha('white', 0.7), mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={project.category} 
                        size="small" 
                        sx={{ 
                          backgroundColor: alpha(getCategoryColor(project.category), 0.2), 
                          color: getCategoryColor(project.category),
                          border: `1px solid ${alpha(getCategoryColor(project.category), 0.3)}`
                        }} 
                      />
                      <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                        {project.progress === 100 ? 'Complete' : `${project.progress}% Ready`}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress} 
                      sx={{ 
                        mt: 1,
                        backgroundColor: alpha('white', 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getCategoryColor(project.category)
                        }
                      }} 
                    />
                  </CardContent>
                </CardActionArea>
              </LabCard>
            </Grid>
          ))}
        </Grid>
        
        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            <ExperimentCard>
              <Typography variant="h6" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center' }}>
                <CodeIcon sx={{ mr: 1, color: neonGreen }} />
                Sandbox Environment
              </Typography>
              
              <Box 
                sx={{ 
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px dashed ${alpha(neonGreen, 0.5)}`,
                  borderRadius: 1,
                  p: 2,
                  mb: 3,
                  backgroundColor: alpha('#1e1e1e', 0.5)
                }}
              >
                <Typography sx={{ color: alpha('white', 0.7) }}>
                  Interactive Sandbox Placeholder
                  <br />
                  (Code editor and visual programming would go here)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="contained"
                  sx={{
                    backgroundColor: neonGreen,
                    color: 'black',
                    '&:hover': {
                      backgroundColor: alpha(neonGreen, 0.8),
                    }
                  }}
                >
                  Run Experiment
                </Button>
                
                <Box>
                  <Button 
                    variant="outlined"
                    sx={{
                      borderColor: neonBlue,
                      color: neonBlue,
                      marginRight: 2,
                      '&:hover': {
                        backgroundColor: alpha(neonBlue, 0.1),
                        borderColor: neonBlue
                      }
                    }}
                  >
                    Save Draft
                  </Button>
                  
                  <Button 
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
                    Reset
                  </Button>
                </Box>
              </Box>
            </ExperimentCard>
          </Grid>
          
          {/* Right column */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <ExperimentCard>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Ongoing Experiments
                  </Typography>
                  <Divider sx={{ backgroundColor: alpha(neonGreen, 0.3), mb: 2 }} />
                  
                  {ongoingExperiments.map((experiment, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        mb: 2, 
                        pb: 2, 
                        borderBottom: index !== ongoingExperiments.length - 1 ? `1px solid ${alpha('white', 0.1)}` : 'none'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          {experiment.name}
                        </Typography>
                        <Chip 
                          label={experiment.category} 
                          size="small" 
                          sx={{ 
                            backgroundColor: alpha(getCategoryColor(experiment.category), 0.2), 
                            color: getCategoryColor(experiment.category),
                            fontSize: '0.7rem',
                            height: 20
                          }} 
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                          {experiment.progress}% Complete
                        </Typography>
                        <Typography variant="caption" sx={{ color: alpha('white', 0.5) }}>
                          Updated: {experiment.lastUpdated}
                        </Typography>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={experiment.progress} 
                        sx={{ 
                          backgroundColor: alpha('white', 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getCategoryColor(experiment.category)
                          }
                        }} 
                      />
                    </Box>
                  ))}
                  
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{
                      mt: 1,
                      borderColor: neonGreen,
                      color: neonGreen,
                      '&:hover': {
                        backgroundColor: alpha(neonGreen, 0.1),
                        borderColor: neonGreen
                      }
                    }}
                  >
                    View All Experiments
                  </Button>
                </ExperimentCard>
              </Grid>
              
              <Grid item>
                <ExperimentCard>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Lab Resources
                  </Typography>
                  <Divider sx={{ backgroundColor: alpha(neonGreen, 0.3), mb: 2 }} />
                  
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderColor: neonGreen,
                      color: neonGreen,
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: alpha(neonGreen, 0.1),
                        borderColor: neonGreen
                      }
                    }}
                  >
                    <CodeIcon sx={{ mr: 1 }} /> API Documentation
                  </Button>
                  
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderColor: neonBlue,
                      color: neonBlue,
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: alpha(neonBlue, 0.1),
                        borderColor: neonBlue
                      }
                    }}
                  >
                    <AutoGraphIcon sx={{ mr: 1 }} /> Data Sources
                  </Button>
                  
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{
                      borderColor: neonPurple,
                      color: neonPurple,
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: alpha(neonPurple, 0.1),
                        borderColor: neonPurple
                      }
                    }}
                  >
                    <PsychologyIcon sx={{ mr: 1 }} /> AI Model Gallery
                  </Button>
                </ExperimentCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default LabsScreen;
