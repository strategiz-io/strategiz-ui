import React, { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  Paper,
  Alert,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Define the neonGreen color
const neonGreen = '#39FF14';

interface SignUpFormProps {
  onSubmit: (userData: {
    name: string;
    email: string;
    authMethod: string;
  }) => Promise<boolean | void>;
  passkeySupported: boolean;
  loading?: boolean;
  error?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  passkeySupported,
  loading = false,
  error,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    authMethod: 'password',
  });

  // Steps for the signup process
  const steps = ['Your Information', 'Choose Authentication Method', 'Complete Setup'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthMethodChange = (method: string) => {
    setUserData((prev) => ({ ...prev, authMethod: method }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    await onSubmit(userData);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{
          mb: 4,
          '& .MuiStepLabel-root .Mui-completed': {
            color: neonGreen, // circle color when completed
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: neonGreen, // circle color when active
          },
          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
            color: 'grey.500', // text color when completed
          },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
            color: neonGreen, // text color when active
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step content */}
      <Box sx={{ mb: 4 }}>
        {activeStep === 0 && (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, color: 'grey.300' }}>
              Let's get to know you better
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.700',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: neonGreen,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'grey.500',
                  '&.Mui-focused': {
                    color: neonGreen,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.700',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: neonGreen,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'grey.500',
                  '&.Mui-focused': {
                    color: neonGreen,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, color: 'grey.300' }}>
              Choose how you'd like to authenticate in the future
            </Typography>
            
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                gap: 2, 
                mb: 3 
              }}
            >
              <Paper
                elevation={userData.authMethod === 'passkey' ? 3 : 1}
                onClick={() => handleAuthMethodChange('passkey')}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: `1px solid ${userData.authMethod === 'passkey' ? neonGreen : 'grey.800'}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  opacity: passkeySupported ? 1 : 0.5,
                  pointerEvents: passkeySupported ? 'auto' : 'none',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'grey.100' }}>
                  Passkey
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  Use your device's biometric security (fingerprint, face) for passwordless login
                </Typography>
              </Paper>
              
              <Paper
                elevation={userData.authMethod === 'password' ? 3 : 1}
                onClick={() => handleAuthMethodChange('password')}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: `1px solid ${userData.authMethod === 'password' ? neonGreen : 'grey.800'}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'grey.100' }}>
                  Password
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  Traditional password-based authentication
                </Typography>
              </Paper>
            </Box>
            
            {!passkeySupported && (
              <Alert 
                severity="warning"
                sx={{ 
                  mb: 3,
                  backgroundColor: 'rgba(255, 167, 38, 0.1)',
                  color: 'warning.light',
                  border: '1px solid',
                  borderColor: 'warning.dark',
                }}
              >
                Passkey authentication is not supported by your browser or device.
              </Alert>
            )}
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, color: 'grey.300' }}>
              Review your information
            </Typography>
            
            <Box sx={{ mb: 4, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'grey.100' }}>
                Name: <span style={{ color: neonGreen }}>{userData.name}</span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'grey.100' }}>
                Email: <span style={{ color: neonGreen }}>{userData.email}</span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'grey.100' }}>
                Authentication Method: <span style={{ color: neonGreen }}>{userData.authMethod === 'passkey' ? 'Passkey' : 'Password'}</span>
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ mb: 3, color: 'grey.400' }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Error message */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: 'error.light',
            border: '1px solid',
            borderColor: 'error.dark',
          }}
        >
          {error}
        </Alert>
      )}

      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0 || loading}
          onClick={handleBack}
          sx={{
            borderColor: 'grey.700',
            color: 'grey.300',
            '&:hover': {
              borderColor: neonGreen,
              backgroundColor: 'rgba(57, 255, 20, 0.08)',
            },
          }}
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !userData.name || !userData.email}
            sx={{
              backgroundColor: neonGreen,
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(57, 255, 20, 0.8)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'grey.800',
                color: 'grey.500',
              },
            }}
          >
            Create Account
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              loading || 
              (activeStep === 0 && (!userData.name || !userData.email))
            }
            sx={{
              backgroundColor: neonGreen,
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(57, 255, 20, 0.8)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'grey.800',
                color: 'grey.500',
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>

      {/* Sign In link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/signin"
            sx={{
              color: neonGreen,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
