import React from 'react';
import AuthLayout from '../components/AuthLayout';
import SignInForm from '../components/SignInForm';
import useAuthController from '../hooks/useAuthController';
import { useAppSelector } from '../../../store';
import { selectError, selectLoading } from '../redux/authSlice';

export const SignInScreen: React.FC = () => {
  const {
    passkeySupported,
    handleGoogleSignIn,
    handleFacebookSignIn,
    handlePasskeySignIn,
    handleSendSmsCode,
    handleVerifySmsCode,
    handleVerifyTOTP
  } = useAuthController();

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  return (
    <AuthLayout
      title="SIGN IN"
      subtitle=""
    >
      <SignInForm
        onGoogleSignIn={handleGoogleSignIn}
        onFacebookSignIn={handleFacebookSignIn}
        onPasskeySignIn={handlePasskeySignIn}
        onSendSmsCode={handleSendSmsCode}
        onVerifySmsCode={handleVerifySmsCode}
        onVerifyTOTP={handleVerifyTOTP}
        loading={loading}
        error={error || undefined}
      />
    </AuthLayout>
  );
};

export default SignInScreen;
