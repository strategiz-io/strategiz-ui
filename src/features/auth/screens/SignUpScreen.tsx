import React from 'react';
import AuthLayout from '../components/AuthLayout';
import SignUpForm from '../components/SignUpForm';
import useAuthController from '../hooks/useAuthController';
import { useAppSelector } from '../../../store';
import { selectError, selectLoading } from '../redux/authSlice';

export const SignUpScreen: React.FC = () => {
  const { handleSignUp, passkeySupported } = useAuthController();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Strategiz to start building your trading strategies"
    >
      <SignUpForm
        onSubmit={handleSignUp}
        passkeySupported={passkeySupported}
        loading={loading}
        error={error || undefined}
      />
    </AuthLayout>
  );
};

export default SignUpScreen;
