import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { selectIsAuthenticated, selectLoading } from '../redux/authSlice';
import LoadingOverlay from '../../../components/ui/LoadingOverlay';

// Protected routes - accessible only when authenticated
export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectLoading);
  const location = useLocation();

  if (loading) {
    return <LoadingOverlay />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

// Public routes - accessible only when not authenticated
export const PublicRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectLoading);
  
  if (loading) {
    return <LoadingOverlay />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
