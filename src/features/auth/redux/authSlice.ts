import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { AuthMethods, OAuthProvider, User } from '../types';

// Define the auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  availableAuthMethods: AuthMethods | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  availableAuthMethods: null,
};

// The auth slice for the store
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthMethods: (state, action: PayloadAction<AuthMethods>) => {
      state.availableAuthMethods = action.payload;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setUser,
  setLoading,
  setError,
  setAuthMethods,
  clearAuthState,
} = authSlice.actions;

// Export selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectAuthMethods = (state: RootState) => state.auth.availableAuthMethods;

// Export reducer
export default authSlice.reducer;
