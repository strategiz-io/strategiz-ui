/**
 * authService.ts
 * 
 * This file acts as a bridge between the UI components and the business logic in strategiz-core.
 * It provides an interface for authentication-related operations that can be implemented
 * by the business logic layer.
 */

import { User, ApiResponse, AuthMethods, OAuthProvider } from '../types';

// Interface for the auth service that will be implemented in strategiz-core
export interface AuthServiceInterface {
  // User session operations
  signIn: (email: string, password: string) => Promise<ApiResponse<User>>;
  signOut: () => Promise<ApiResponse<void>>;
  refreshSession: () => Promise<ApiResponse<User>>;
  
  // OAuth operations
  signInWithProvider: (provider: OAuthProvider) => Promise<ApiResponse<User>>;
  
  // Passkey operations
  signInWithPasskey: () => Promise<ApiResponse<User>>;
  registerPasskey: (userId: string) => Promise<ApiResponse<boolean>>;
  
  // Two-factor operations
  sendSmsCode: (phoneNumber: string) => Promise<ApiResponse<boolean>>;
  verifySmsCode: (code: string) => Promise<ApiResponse<User>>;
  verifyTOTP: (email: string, code: string) => Promise<ApiResponse<User>>;
  
  // User creation
  createUser: (userData: {
    name: string;
    email: string;
    authMethod: string;
  }) => Promise<ApiResponse<User>>;
  
  // Status checks
  isPasskeySupported: () => Promise<boolean>;
  getAvailableAuthMethods: () => Promise<AuthMethods>;
}

// Default implementation that will be replaced with actual business logic
class DefaultAuthService implements AuthServiceInterface {
  // Mock implementation that will be replaced with actual business logic
  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async signOut(): Promise<ApiResponse<void>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async refreshSession(): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async signInWithProvider(provider: OAuthProvider): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async signInWithPasskey(): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async registerPasskey(userId: string): Promise<ApiResponse<boolean>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: false,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async sendSmsCode(phoneNumber: string): Promise<ApiResponse<boolean>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: false,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async verifySmsCode(code: string): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async verifyTOTP(email: string, code: string): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async createUser(userData: {
    name: string;
    email: string;
    authMethod: string;
  }): Promise<ApiResponse<User>> {
    console.warn('This is a UI-only implementation without business logic. Connect to strategiz-core for real implementation.');
    return {
      success: false,
      data: null,
      error: 'Not implemented in UI layer. Connection to business logic required.',
      message: 'Operation not implemented',
      timestamp: new Date().toISOString()
    };
  }

  async isPasskeySupported(): Promise<boolean> {
    // This could potentially be implemented in the UI layer
    return 'PublicKeyCredential' in window;
  }

  async getAvailableAuthMethods(): Promise<AuthMethods> {
    // Default auth methods that could be overridden by the business logic
    return {
      passkey: await this.isPasskeySupported(),
      sms: true,
      totp: true,
      oauth: {
        google: true,
        facebook: true,
        twitter: false,
        github: false
      }
    };
  }
}

// Export a singleton instance that will be replaced with the implementation from strategiz-core
export const authService: AuthServiceInterface = new DefaultAuthService();

// This function would be called to inject the real implementation from strategiz-core
export const setAuthService = (implementation: AuthServiceInterface): void => {
  Object.assign(authService, implementation);
};

export default authService;
