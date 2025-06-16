import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingScreen from '../features/landing/screens/LandingScreen';
import SignInScreen from '../features/auth/screens/SignInScreen';
import SignUpScreen from '../features/auth/screens/SignUpScreen';
import { ProtectedRoute, PublicRoute } from '../features/auth/components/AuthGuard';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../features/auth/redux/authSlice';

// Placeholder for dashboard
const Dashboard: React.FC = () => {
  return (
    <div>Dashboard Placeholder</div>
  );
};

// Main routes component
export const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // Navigation handlers for the landing page
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  const handleExploreStrategies = () => {
    navigate('/marketplace');
  };
  
  const handleNavigateToFeature = (path: string) => {
    navigate(path);
  };
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <LandingScreen
          isAuthenticated={isAuthenticated}
          onGetStarted={handleGetStarted}
          onExploreStrategies={handleExploreStrategies}
          onNavigateToFeature={handleNavigateToFeature}
        />
      } />
      
      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
