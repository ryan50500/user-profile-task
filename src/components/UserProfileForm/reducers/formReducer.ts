// Reducer for managing form state
// formReducer (local)
// - Manages UI behavior: validation errors, success message, current step
// - Used only inside UserProfileForm
// - Controls how the user interacts with the form
// - Updated via local dispatchForm()

import { UserProfileState } from '../context/UserProfileContext';

// Local form state type
export interface FormState {
  validationErrors: Partial<UserProfileState>; // Validation errors for form fields
  saving: boolean; // Indicates if the form is currently being saved
  success: boolean; // Indicates if the form was successfully submitted
  step: number; // Current step in the multi-step form
}

export type FormAction =
  | { type: 'SET_VALIDATION_ERRORS'; payload: Partial<UserProfileState> } // Action to set validation errors
  | { type: 'SET_SAVING'; payload: boolean } // Action to set saving state
  | { type: 'SET_SUCCESS'; payload: boolean } // Action to set success state
  | { type: 'SET_STEP'; payload: number } // Action to set the current step
  | { type: 'RESET_FORM' }; // Action to reset the form state

// Initial state for the form
export const initialFormState: FormState = {
  validationErrors: {}, // No validation errors initially
  saving: false, // Form is not saving initially
  success: false, // Form is not successful initially
  step: 0, // Start at the first step
};

// Reducer function to handle form state updates
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload }; // Update validation errors
    case 'SET_SAVING':
      return { ...state, saving: action.payload }; // Update saving state
    case 'SET_SUCCESS':
      return { ...state, success: action.payload }; // Update success state
    case 'SET_STEP':
      return { ...state, step: action.payload }; // Update current step
    case 'RESET_FORM':
      return { ...initialFormState }; // Reset to initial state
    default:
      return state; // Return current state if action type is unrecognized
  }
}
