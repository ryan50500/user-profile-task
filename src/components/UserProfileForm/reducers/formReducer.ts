import { UserProfileState } from '../context/UserProfileContext';

// Local form state type
export interface FormState {
  validationErrors: Partial<UserProfileState>; // Validation errors for form fields
  saving: boolean; // Indicates if the form is currently being saved
  success: boolean; // Indicates if the form was successfully submitted
  step: number; // Current step in the multi-step form (in case for future expansion)
}

export type FormAction =
  | { type: 'SET_VALIDATION_ERRORS'; payload: Partial<UserProfileState> }
  | { type: 'SET_SAVING'; payload: boolean } 
  | { type: 'SET_SUCCESS'; payload: boolean } 
  | { type: 'SET_STEP'; payload: number } 
  | { type: 'RESET_FORM' }
  | { type: 'RESET_USER_PROFILE'; payload: UserProfileState }; // Action to reset user profile

// Initial state for the form
export const initialFormState: FormState = {
  validationErrors: {},
  saving: false, 
  success: false, 
  step: 0, // Start at the first step of form
};

// Reducer function to handle form state updates
// - Used in the UserProfileForm component to manage local form state
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };
    case 'SET_SAVING':
      return { ...state, saving: action.payload };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload, // Update the success state
      };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET_FORM':
      return { ...initialFormState }; // Reset to initial state
    case 'RESET_USER_PROFILE':
      return {
        ...state,
        validationErrors: {}, // Clear validation errors
        ...action.payload, // Spread the payload to reset the user profile state
      };
    default:
      return state;
  }
}
