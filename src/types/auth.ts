/**
 * Authentication related types
 */

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
};

export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  photoURL?: string;
  provider: string;
  emailVerified: boolean;
  phoneNumber?: string;
  isAnonymous: boolean;
  createdAt: string;
  lastLoginAt: string;
  updatedAt: string;
  preferences: UserPreferences;
  authMethods: AuthMethods;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  isAnonymous: boolean;
  emailVerified: boolean;
  providerData: ProviderData[];
}

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: {
    sms: boolean;
    push: boolean;
    trades: boolean;
    performance?: boolean;
  };
  language?: string;
}

export interface AuthMethods {
  totp?: boolean;
}

export type OAuthProvider = 'google' | 'facebook' | 'github';
