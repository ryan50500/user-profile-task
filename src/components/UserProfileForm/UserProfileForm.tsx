import React, { useEffect } from 'react';
import styles from './UserProfileForm.module.css';
import { useUserProfile } from './context/UserProfileContext';
import FormStep from './FormStep';
import FormStepper from './FormStepper';
import FormSaveButton from './FormSaveButton';
import FormSuccessMessage from './FormSuccessMessage';

// Initial data for dirty check (simulate loaded data)
const initialData = {
  name: '',
  email: '',
  bio: '',
  theme: 'light',
  newsletter: false,
};

// Local form state type
interface FormState {
  validationErrors: Partial<typeof initialData>;
  dirty: boolean;
  saving: boolean;
  success: boolean;
  step: number;
}

export type FormAction =
  | { type: 'SET_VALIDATION_ERRORS'; payload: Partial<typeof initialData> }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET_FORM' };

const initialFormState: FormState = {
  validationErrors: {},
  dirty: false,
  saving: false,
  success: false,
  step: 0,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };
    case 'SET_DIRTY':
      return { ...state, dirty: action.payload };
    case 'SET_SAVING':
      return { ...state, saving: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET_FORM':
      return { ...initialFormState };
    default:
      return state;
  }
}

const validateForm = (state: typeof initialData) => {
  // set a temporary error object to store validation errors
  const temporaryErrors: Partial<typeof initialData> = {};
  // add validation errors to the temporaryErrors object
  if (!state.name.trim()) temporaryErrors.name = 'Name is required.';
  if (!state.email.trim()) temporaryErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) temporaryErrors.email = 'Invalid email address.';
  if (!state.bio.trim()) temporaryErrors.bio = 'Bio is required.';
  // return temporary error object
  return temporaryErrors;
};

const UserProfileForm: React.FC = () => {
  // global state from our context 
  const { state } = useUserProfile();
  // local state with useReducer
  const [formState, dispatchForm] = React.useReducer(formReducer, initialFormState);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALIDATION_ERRORS', payload: validateForm(state) });
    dispatchForm({ type: 'SET_DIRTY', payload: JSON.stringify(state) !== JSON.stringify(initialData) });
    dispatchForm({ type: 'SET_SUCCESS', payload: false });
  }, [state]);

  // Check if there are no validation errors
  const isValid = Object.keys(formState.validationErrors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If there are validation errors or form is not dirty, do not submit
    if (!isValid || !formState.dirty) return;
    // if no errors the proceed to submitting form
    dispatchForm({ type: 'SET_SAVING', payload: true });
    setTimeout(() => {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: true });
    }, 1500); // Simulate API call
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormStep step={formState.step} validationErrors={formState.validationErrors} />
      {/* <FormStepper step={formState.step} dispatchForm={dispatchForm} /> */}
      <FormSaveButton isValid={isValid} dirty={formState.dirty} saving={formState.saving} />
      <FormSuccessMessage show={formState.success} />
    </form>
  );
};

export default UserProfileForm;
