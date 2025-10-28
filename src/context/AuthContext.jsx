import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import apiClient from '../api/apiClient';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Auth Context
const AuthContext = createContext(undefined);

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      // Mock authentication for development
      if (credentials.email === 'mubarak@alhikmah.edu.ng' && credentials.password === 'password123') {
        const mockUser = {
          id: '1',
          name: 'Mubarak',
          email: 'mubarak@alhikmah.edu.ng',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        localStorage.setItem('authToken', 'mock-token-123');
        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message || 'Login failed' });
      throw error;
    }
  };

  const register = async (data) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      
      // Mock registration for development
      const mockUser = {
        id: '1',
        name: data.name,
        email: data.email,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      localStorage.setItem('authToken', 'mock-token-123');
      dispatch({ type: 'REGISTER_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message || 'Registration failed' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Mock user check for development
      if (token === 'mock-token-123') {
        const mockUser = {
          id: '1',
          name: 'Mubarak',
          email: 'mubarak@alhikmah.edu.ng',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      } else {
        localStorage.removeItem('authToken');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    state,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
