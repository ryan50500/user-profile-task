import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Defining the structure of the user profile state
export type UserProfileState = {
  name: string; 
  email: string; 
  bio: string; 
  theme: string;
  newsletter: boolean;
};

// Each action has a type (what kind of update) and a payload (the new value).
export type UserProfileAction =
  | { type: 'SET_NAME'; payload: string } 
  | { type: 'SET_EMAIL'; payload: string } 
  | { type: 'SET_BIO'; payload: string } 
  | { type: 'SET_THEME'; payload: string } 
  | { type: 'SET_NEWSLETTER'; payload: boolean }
  | { type: 'RESET_USER_PROFILE'; payload: UserProfileState } // Added RESET_USER_PROFILE action type
  | { type: 'SET_SUCCESS'; payload: boolean }; // Added SET_SUCCESS action type


// Default User Profile state on page load
const initialState: UserProfileState = {
  name: '', 
  email: '', 
  bio: '', 
  theme: 'light',
  newsletter: false
};

// Reducer function to handle state updates based on actions
function userProfileReducer(state: UserProfileState, action: UserProfileAction): UserProfileState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }; 
    case 'SET_EMAIL':
      return { ...state, email: action.payload }; 
    case 'SET_BIO':
      return { ...state, bio: action.payload }; 
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_NEWSLETTER':
      return { ...state, newsletter: action.payload }; 
    case 'RESET_USER_PROFILE':
      return { ...initialState }; // Reset state to initial values
    default:
      return state; // Return current state if action type is unrecognized
  }
}

// Defining the structure of the context value
type UserProfileContextType = {
  state: UserProfileState; // Current state of the user profile
  dispatch: React.Dispatch<UserProfileAction>; // Function to dispatch actions to update state
};

// The context provides a way to share state across components without passing props.
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Provider component to wrap parts of the app that need access to user profile state
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);
  return (
    <UserProfileContext.Provider value={{ state, dispatch }}>
      {children} 
    </UserProfileContext.Provider>
  );
};

// Custom hook to access the user profile context
export const useUserProfile = () => {
  const context = useContext(UserProfileContext); // Get the context value (state + dispatch)

   // Make sure the component using this hook is wrapped in <UserProfileProvider>
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  return context; // Return the context so components can access and update user profile state
};

