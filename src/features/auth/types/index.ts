// User model
export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  createdAt: string;
  
  // Additional properties used in UI components
  avatar?: string;
  fullName?: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  message?: string;
  timestamp?: string;
}

// OAuth providers enum
export enum OAuthProvider {
  Google = 'google',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Github = 'github'
}

// Available auth methods
export interface AuthMethods {
  passkey: boolean;
  sms: boolean;
  totp: boolean;
  oauth: {
    google: boolean;
    facebook: boolean;
    twitter: boolean;
    github: boolean;
  };
}
