import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  Link,
  alpha,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Google as GoogleIcon,
  Key as KeyIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Fingerprint as FingerprintIcon,
  QrCode2 as QrCodeIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';

interface AuthState {
  email: string;
  phoneNumber: string;
  verificationCode: string;
  totpCode: string;
}

interface SignInFormProps {
  onGoogleSignIn: () => Promise<boolean | void>;
  onFacebookSignIn: () => Promise<boolean | void>;
  onPasskeySignIn: () => Promise<boolean | void>;
  onSendSmsCode: (phoneNumber: string) => Promise<boolean | void>;
  onVerifySmsCode: (code: string) => Promise<boolean | void>;
  onVerifyTOTP: (email: string, code: string) => Promise<boolean | void>;
  error?: string;
  loading?: boolean;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onGoogleSignIn,
  onFacebookSignIn,
  onPasskeySignIn,
  onSendSmsCode,
  onVerifySmsCode,
  onVerifyTOTP,
  error,
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    email: '',
    phoneNumber: '',
    verificationCode: '',
    totpCode: '',
  });

  // Neon green color
  const neonGreen = '#39FF14';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthState((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSmsCodeSent(false);
  };

  const handleGoogleSignIn = async () => {
    await onGoogleSignIn();
  };

  const handleFacebookSignIn = async () => {
    await onFacebookSignIn();
  };

  const handlePasskeySignIn = async () => {
    await onPasskeySignIn();
  };

  const handleSendSmsCode = async () => {
    if (authState.phoneNumber) {
      const success = await onSendSmsCode(authState.phoneNumber);
      if (success !== false) {
        setSmsCodeSent(true);
      }
    }
  };

  const handleVerifySmsCode = async () => {
    if (authState.verificationCode) {
      await onVerifySmsCode(authState.verificationCode);
    }
  };

  const handleVerifyTOTP = async () => {
    if (authState.email && authState.totpCode) {
      await onVerifyTOTP(authState.email, authState.totpCode);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Authentication Methods */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        aria-label="authentication methods"
        sx={{
          mb: 3,
          minHeight: 48,
          '& .MuiTabs-indicator': {
            backgroundColor: neonGreen,
          },
        }}
      >
        <Tab
          icon={<KeyIcon />}
          label="Passkey"
          sx={{
            minHeight: 48,
            color: 'grey.500',
            '&.Mui-selected': {
              color: neonGreen,
            },
          }}
        />
        <Tab
          icon={<QrCodeIcon />}
          label="Authenticator App"
          sx={{
            minHeight: 48,
            color: 'grey.500',
            '&.Mui-selected': {
              color: neonGreen,
            },
          }}
        />
        <Tab
          icon={<PhoneIcon />}
          label="SMS"
          sx={{
            minHeight: 48,
            color: 'grey.500',
            '&.Mui-selected': {
              color: neonGreen,
            },
          }}
        />
      </Tabs>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
            Sign in with your security passkey (requires browser support).
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handlePasskeySignIn}
            disabled={loading}
            startIcon={<FingerprintIcon />}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: neonGreen,
              color: 'black',
              '&:hover': {
                backgroundColor: alpha(neonGreen, 0.8),
              },
              '&.Mui-disabled': {
                backgroundColor: 'grey.800',
                color: 'grey.500',
              },
            }}
          >
            Sign in with Passkey
          </Button>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
            Enter your email and the code from your authenticator app.
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={authState.email}
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
            label="Authenticator Code"
            name="totpCode"
            type="text"
            value={authState.totpCode}
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
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerifyTOTP}
            disabled={loading || !authState.email || !authState.totpCode}
            sx={{
              mt: 1,
              py: 1.5,
              backgroundColor: neonGreen,
              color: 'black',
              '&:hover': {
                backgroundColor: alpha(neonGreen, 0.8),
              },
              '&.Mui-disabled': {
                backgroundColor: 'grey.800',
                color: 'grey.500',
              },
            }}
          >
            Verify
          </Button>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          {!smsCodeSent ? (
            <>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
                Enter your phone number to receive a verification code.
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={authState.phoneNumber}
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
              <Button
                fullWidth
                variant="contained"
                onClick={handleSendSmsCode}
                disabled={loading || !authState.phoneNumber}
                sx={{
                  mt: 1,
                  py: 1.5,
                  backgroundColor: neonGreen,
                  color: 'black',
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.8),
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'grey.800',
                    color: 'grey.500',
                  },
                }}
              >
                Send Verification Code
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
                Enter the verification code sent to your phone.
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Verification Code"
                name="verificationCode"
                type="text"
                value={authState.verificationCode}
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
              <Button
                fullWidth
                variant="contained"
                onClick={handleVerifySmsCode}
                disabled={loading || !authState.verificationCode}
                sx={{
                  mt: 1,
                  py: 1.5,
                  backgroundColor: neonGreen,
                  color: 'black',
                  '&:hover': {
                    backgroundColor: alpha(neonGreen, 0.8),
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'grey.800',
                    color: 'grey.500',
                  },
                }}
              >
                Verify Code
              </Button>
            </>
          )}
        </Box>
      )}

      {/* Divider */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Divider
          sx={{
            flexGrow: 1,
            borderColor: 'grey.800',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            px: 2,
            color: 'grey.500',
          }}
        >
          or continue with
        </Typography>
        <Divider
          sx={{
            flexGrow: 1,
            borderColor: 'grey.800',
          }}
        />
      </Box>

      {/* Social Sign In Buttons */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleGoogleSignIn}
          disabled={loading}
          startIcon={<GoogleIcon sx={{ color: '#EA4335' }}/>}
          sx={{
            py: 1.5,
            flex: 1,
            borderColor: 'grey.700',
            color: 'white',
            '&:hover': {
              borderColor: '#EA4335',
              backgroundColor: 'rgba(234, 67, 53, 0.08)',
            },
          }}
        >
          Google
        </Button>
        <Button
          variant="outlined"
          onClick={handleFacebookSignIn}
          disabled={loading}
          startIcon={<FacebookIcon sx={{ color: '#4267B2' }}/>}
          sx={{
            py: 1.5,
            flex: 1,
            borderColor: 'grey.700',
            color: 'white',
            '&:hover': {
              borderColor: '#4267B2',
              backgroundColor: 'rgba(66, 103, 178, 0.08)',
            },
          }}
        >
          Facebook
        </Button>
      </Box>

      {/* Error message */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{
            mt: 2,
            textAlign: 'center',
          }}
        >
          {error}
        </Typography>
      )}

      {/* Sign Up link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: neonGreen,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
