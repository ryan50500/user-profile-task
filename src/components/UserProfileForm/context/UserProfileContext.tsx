import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// State type
type UserProfileState = {
  name: string;
  email: string;
  bio: string;
  theme: string;
  newsletter: boolean;
};

// Action type
 type UserProfileAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_BIO'; payload: string }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_NEWSLETTER'; payload: boolean };

const initialState: UserProfileState = {
  name: '',
  email: '',
  bio: '',
  theme: 'light',
  newsletter: false,
};

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
    default:
      return state;
  }
}

type UserProfileContextType = {
  state: UserProfileState;
  dispatch: React.Dispatch<UserProfileAction>;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);
  return (
    <UserProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error('useUserProfile must be used within a UserProfileProvider');
  return context;
};
