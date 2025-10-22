import React, { createContext, useContext, useReducer } from 'react';

// Initial clearance progress state
const initialState = {
  upload: 'completed',
  verification: 'in-progress',
  eligibility: 'pending',
  recommendation: 'pending',
  overall: 50,
  documentsUploaded: 4,
  totalDocuments: 6,
  verificationStatus: 'In Progress',
  eligibilityStatus: 'Pending',
  recommendedCourse: null,
  lastUpdated: new Date().toISOString(),
};

// Clearance actions
const clearanceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_UPLOAD':
      return {
        ...state,
        upload: action.payload,
        overall: action.payload === 'completed' ? 25 : 0,
        lastUpdated: new Date().toISOString(),
      };
    case 'UPDATE_VERIFICATION':
      return {
        ...state,
        verification: action.payload,
        overall: action.payload === 'completed' ? 50 : 25,
        lastUpdated: new Date().toISOString(),
      };
    case 'UPDATE_ELIGIBILITY':
      return {
        ...state,
        eligibility: action.payload,
        overall: action.payload === 'completed' ? 75 : 50,
        lastUpdated: new Date().toISOString(),
      };
    case 'UPDATE_RECOMMENDATION':
      return {
        ...state,
        recommendation: action.payload,
        overall: action.payload === 'completed' ? 100 : 75,
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_DOCUMENTS':
      return {
        ...state,
        documentsUploaded: action.payload.uploaded,
        totalDocuments: action.payload.total,
      };
    case 'SET_VERIFICATION_STATUS':
      return {
        ...state,
        verificationStatus: action.payload,
      };
    case 'SET_ELIGIBILITY_STATUS':
      return {
        ...state,
        eligibilityStatus: action.payload,
      };
    case 'SET_RECOMMENDED_COURSE':
      return {
        ...state,
        recommendedCourse: action.payload,
      };
    case 'RESET_PROGRESS':
      return initialState;
    default:
      return state;
  }
};

// Clearance Context
const ClearanceContext = createContext(undefined);

// Clearance Provider
export const ClearanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clearanceReducer, initialState);

  const updateUpload = (status) => {
    dispatch({ type: 'UPDATE_UPLOAD', payload: status });
  };

  const updateVerification = (status) => {
    dispatch({ type: 'UPDATE_VERIFICATION', payload: status });
  };

  const updateEligibility = (status) => {
    dispatch({ type: 'UPDATE_ELIGIBILITY', payload: status });
  };

  const updateRecommendation = (status) => {
    dispatch({ type: 'UPDATE_RECOMMENDATION', payload: status });
  };

  const setDocuments = (uploaded, total) => {
    dispatch({ type: 'SET_DOCUMENTS', payload: { uploaded, total } });
  };

  const setVerificationStatus = (status) => {
    dispatch({ type: 'SET_VERIFICATION_STATUS', payload: status });
  };

  const setEligibilityStatus = (status) => {
    dispatch({ type: 'SET_ELIGIBILITY_STATUS', payload: status });
  };

  const setRecommendedCourse = (course) => {
    dispatch({ type: 'SET_RECOMMENDED_COURSE', payload: course });
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };

  const value = {
    state,
    updateUpload,
    updateVerification,
    updateEligibility,
    updateRecommendation,
    setDocuments,
    setVerificationStatus,
    setEligibilityStatus,
    setRecommendedCourse,
    resetProgress,
  };

  return (
    <ClearanceContext.Provider value={value}>
      {children}
    </ClearanceContext.Provider>
  );
};

// Custom hook to use clearance context
export const useClearance = () => {
  const context = useContext(ClearanceContext);
  if (context === undefined) {
    throw new Error('useClearance must be used within a ClearanceProvider');
  }
  return context;
};
