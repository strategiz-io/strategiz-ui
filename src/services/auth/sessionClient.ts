import axios from 'axios';
import type { User, ApiResponse } from '../../types/auth';

/**
 * Interface for the Session Client
 * Handles user authentication, session management, and user data operations
 */
export interface SessionClient {
  createUser(userData: any): Promise<ApiResponse<User>>;
  signIn(email: string, password: string): Promise<ApiResponse<{user: User, accessToken: string, refreshToken: string}>>;
  signOut(): Promise<ApiResponse<void>>;
  refreshSession(refreshToken: string): Promise<ApiResponse<{accessToken: string}>>;
  getCurrentUser(): Promise<ApiResponse<User>>;
  updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse<User>>;
  deleteUser(userId: string): Promise<ApiResponse<void>>;
}

/**
 * Default implementation of the Session Client
 * Uses axios for API communication
 */
export class DefaultSessionClient implements SessionClient {
  private readonly API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? (process.env.REACT_APP_API_URL || '') 
    : '';

  /**
   * Create a new user account
   */
  public async createUser(userData: any): Promise<ApiResponse<User>> {
    try {
      const response = await axios.post<ApiResponse<User>>(
        `${this.API_BASE_URL}/auth/register`, 
        userData
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create user',
        error: error.response?.data?.error || 'USER_CREATION_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Sign in a user with email and password
   */
  public async signIn(email: string, password: string): Promise<ApiResponse<{user: User, accessToken: string, refreshToken: string}>> {
    try {
      const response = await axios.post<ApiResponse<{user: User, accessToken: string, refreshToken: string}>>(
        `${this.API_BASE_URL}/auth/login`,
        { email, password }
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Authentication failed',
        error: error.response?.data?.error || 'AUTH_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Sign out the current user
   */
  public async signOut(): Promise<ApiResponse<void>> {
    try {
      const response = await axios.post<ApiResponse<void>>(
        `${this.API_BASE_URL}/auth/logout`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to sign out',
        error: error.response?.data?.error || 'SIGNOUT_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Refresh the access token using a refresh token
   */
  public async refreshSession(refreshToken: string): Promise<ApiResponse<{accessToken: string}>> {
    try {
      const response = await axios.post<ApiResponse<{accessToken: string}>>(
        `${this.API_BASE_URL}/auth/refresh`,
        { refreshToken }
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to refresh session',
        error: error.response?.data?.error || 'REFRESH_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get the current authenticated user
   */
  public async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await axios.get<ApiResponse<User>>(
        `${this.API_BASE_URL}/auth/me`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get current user',
        error: error.response?.data?.error || 'GET_USER_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Update a user's profile information
   */
  public async updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await axios.put<ApiResponse<User>>(
        `${this.API_BASE_URL}/users/${userId}`,
        updates
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update user',
        error: error.response?.data?.error || 'UPDATE_USER_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Delete a user account
   */
  public async deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete<ApiResponse<void>>(
        `${this.API_BASE_URL}/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete user',
        error: error.response?.data?.error || 'DELETE_USER_FAILED',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const sessionClient = new DefaultSessionClient();
