import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../store';
import { 
  setUser, 
  setLoading, 
  setError,
  clearAuthState 
} from '../redux/authSlice';
import authService from '../services/authService';
import { OAuthProvider } from '../types';

/**
 * useAuthController acts as a mediator between UI components and business logic
 * It handles the connection between presentational components and the auth service
 * while also dispatching to Redux for global state updates
 */

export const useAuthController = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passkeySupported, setPasskeySupported] = useState(false);

  // Check passkey support when the component mounts
  useEffect(() => {
    const checkPasskeySupport = async () => {
      const supported = await authService.isPasskeySupported();
      setPasskeySupported(supported);
    };
    
    checkPasskeySupport();
  }, []);

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.signInWithProvider(OAuthProvider.Google);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        navigate('/dashboard');
      } else {
        dispatch(setError(response.error || 'Failed to sign in with Google'));
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during Google sign in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Facebook sign in
  const handleFacebookSignIn = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.signInWithProvider(OAuthProvider.Facebook);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        navigate('/dashboard');
      } else {
        dispatch(setError(response.error || 'Failed to sign in with Facebook'));
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during Facebook sign in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Passkey sign in
  const handlePasskeySignIn = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.signInWithPasskey();
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        navigate('/dashboard');
      } else {
        dispatch(setError(response.error || 'Failed to sign in with passkey'));
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during passkey sign in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle sending SMS code
  const handleSendSmsCode = async (phoneNumber: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.sendSmsCode(phoneNumber);
      
      if (!response.success) {
        dispatch(setError(response.error || 'Failed to send SMS code'));
      }
      
      return response.success;
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred while sending SMS code'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle verifying SMS code
  const handleVerifySmsCode = async (code: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.verifySmsCode(code);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        navigate('/dashboard');
        return true;
      } else {
        dispatch(setError(response.error || 'Failed to verify SMS code'));
        return false;
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during SMS verification'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle verifying TOTP code
  const handleVerifyTOTP = async (email: string, code: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.verifyTOTP(email, code);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        navigate('/dashboard');
        return true;
      } else {
        dispatch(setError(response.error || 'Failed to verify authenticator code'));
        return false;
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during authenticator verification'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle sign up form submission
  const handleSignUp = async (userData: { name: string; email: string; authMethod: string }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.createUser(userData);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        
        // If user selected passkey authentication, register a passkey
        if (userData.authMethod === 'passkey' && response.data.id) {
          const passkeyResponse = await authService.registerPasskey(response.data.id);
          
          if (!passkeyResponse.success) {
            dispatch(setError(`Account created but passkey setup failed: ${passkeyResponse.error}`));
            return false;
          }
        }
        
        navigate('/dashboard');
        return true;
      } else {
        dispatch(setError(response.error || 'Failed to create account'));
        return false;
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during sign up'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(setLoading(true));
      
      const response = await authService.signOut();
      
      if (response.success) {
        dispatch(clearAuthState());
        navigate('/');
      } else {
        dispatch(setError(response.error || 'Failed to sign out'));
      }
    } catch (error) {
      dispatch(setError((error as Error).message || 'An error occurred during sign out'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    passkeySupported,
    handleGoogleSignIn,
    handleFacebookSignIn,
    handlePasskeySignIn,
    handleSendSmsCode,
    handleVerifySmsCode,
    handleVerifyTOTP,
    handleSignUp,
    handleSignOut
  };
};

export default useAuthController;
