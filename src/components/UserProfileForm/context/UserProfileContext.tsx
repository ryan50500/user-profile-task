// UserProfileContext (global)
// - Holds actual form data (name, email, etc.)
// - Shared across components if needed
// - Source of truth for profile content
// - Updated via context dispatch()

// Importing necessary React utilities for context and state management
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Defining the structure of the user profile state
// This represents the data we want to keep track of for the user profile.
// Each property in the state corresponds to a specific piece of user information.
export type UserProfileState = {
  name: string; // User's name, used for personalization
  email: string; // User's email address, used for communication
  bio: string; // User's biography, used for profile description
  theme: string; // Preferred theme (e.g., light or dark), used for UI customization
  newsletter: boolean; // Whether the user wants to receive newsletters, used for marketing preferences
};

// Defining the structure of actions that can modify the user profile state
// Actions represent the different ways the state can be updated.
// Each action has a type (what kind of update) and a payload (the new value).
 type UserProfileAction =
  | { type: 'SET_NAME'; payload: string } // Action to update the user's name
  | { type: 'SET_EMAIL'; payload: string } // Action to update the user's email
  | { type: 'SET_BIO'; payload: string } // Action to update the user's biography
  | { type: 'SET_THEME'; payload: string } // Action to update the user's preferred theme
  | { type: 'SET_NEWSLETTER'; payload: boolean }; // Action to update the newsletter preference

// Initial state of the user profile
// This is the default state when the application starts.
// It provides initial values for all user profile properties.
const initialState: UserProfileState = {
  name: '', // Default name is empty
  email: '', // Default email is empty
  bio: '', // Default biography is empty
  theme: 'light', // Default theme is light
  newsletter: false, // Default newsletter preference is false
};

// Reducer function to handle state updates based on actions
// The reducer is responsible for updating the state based on the action type and payload.
// It ensures that state changes are predictable and centralized.
function userProfileReducer(state: UserProfileState, action: UserProfileAction): UserProfileState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }; // Update name in state
    case 'SET_EMAIL':
      return { ...state, email: action.payload }; // Update email in state
    case 'SET_BIO':
      return { ...state, bio: action.payload }; // Update biography in state
    case 'SET_THEME':
      return { ...state, theme: action.payload }; // Update theme in state
    case 'SET_NEWSLETTER':
      return { ...state, newsletter: action.payload }; // Update newsletter preference in state
    default:
      return state; // Return current state if action type is unrecognized
  }
}

// Defining the structure of the context value
// The context value combines the current state and the dispatch function.
// This allows components to access the state and update it when needed.
type UserProfileContextType = {
  state: UserProfileState; // Current state of the user profile
  dispatch: React.Dispatch<UserProfileAction>; // Function to dispatch actions to update state
};

// Creating the context for user profile state management
// The context provides a way to share state across components without passing props.
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Provider component to wrap parts of the app that need access to user profile state
// The provider initializes the state and makes it available to child components.
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userProfileReducer, initialState); // Using reducer to manage state
  return (
    <UserProfileContext.Provider value={{ state, dispatch }}>
      {children} 
    </UserProfileContext.Provider>
  );
};

// Custom hook to access user profile context
// This hook simplifies access to the context value.
// It ensures that components can easily read and update the state.
export const useUserProfile = () => {
  const context = useContext(UserProfileContext); // Accessing context value
  if (!context) throw new Error('useUserProfile must be used within a UserProfileProvider'); // Error if context is not available
  return context; // Returning context value
};
