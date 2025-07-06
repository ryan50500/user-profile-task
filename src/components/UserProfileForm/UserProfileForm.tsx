import React, { useEffect } from 'react';
import styles from './UserProfileForm.module.css';
import { useUserProfile, UserProfileState } from './context/UserProfileContext';
import FormStep from './FormStep';
import FormStepper from './FormStepper';
import FormSaveButton from './FormSaveButton';
import FormSuccessMessage from './FormSuccessMessage';

// Local form state type
interface FormState {
  validationErrors: Partial<UserProfileState>;
  saving: boolean;
  success: boolean;
  step: number;
}

export type FormAction =
  | { type: 'SET_VALIDATION_ERRORS'; payload: Partial<UserProfileState> }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET_FORM' };

const initialFormState: FormState = {
  validationErrors: {},
  saving: false,
  success: false,
  step: 0,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };
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

function validateForm(state: UserProfileState): Partial<UserProfileState> {
  const temporaryErrors: Partial<UserProfileState> = {};
  if (!state.name.trim()) temporaryErrors.name = 'Name is required.';
  if (!state.email.trim()) temporaryErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) temporaryErrors.email = 'Invalid email address.';
  if (!state.bio.trim()) temporaryErrors.bio = 'Bio is required.';
  return temporaryErrors;
}

// Added a reducer for managing fetch-related state

// Fetch state type
interface FetchState {
  loadedData: UserProfileState | null;
  loading: boolean;
  fetchError: string | null;
}

// Fetch action type
type FetchAction =
  | { type: 'SET_LOADED_DATA'; payload: UserProfileState | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FETCH_ERROR'; payload: string | null };

const initialFetchState: FetchState = {
  loadedData: null,
  loading: true,
  fetchError: null,
};

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'SET_LOADED_DATA':
      return { ...state, loadedData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FETCH_ERROR':
      return { ...state, fetchError: action.payload };
    default:
      return state;
  }
}

const UserProfileForm: React.FC = () => {
  const { state, dispatch } = useUserProfile(); // `state` here refers to the global context state
  const [formState, dispatchForm] = React.useReducer(formReducer, initialFormState);
  const [fetchState, dispatchFetch] = React.useReducer(fetchReducer, initialFetchState);

  // Fetch initial data from json-server
  useEffect(() => {
    dispatchFetch({ type: 'SET_LOADING', payload: true });
    dispatchFetch({ type: 'SET_FETCH_ERROR', payload: null });
    fetch('http://localhost:3001/userProfile')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user profile');
        return res.json();
      })
      .then(data => {
        dispatchFetch({ type: 'SET_LOADED_DATA', payload: data });
        dispatchFetch({ type: 'SET_LOADING', payload: false });
        // Set context/global state to loaded data (type-safe)
        if (typeof data.name === 'string') {
          dispatch({ type: 'SET_NAME', payload: data.name });
        }
        if (typeof data.email === 'string') {
          dispatch({ type: 'SET_EMAIL', payload: data.email });
        }
        if (typeof data.bio === 'string') {
          dispatch({ type: 'SET_BIO', payload: data.bio });
        }
        if (typeof data.theme === 'string') {
          dispatch({ type: 'SET_THEME', payload: data.theme });
        }
        if (typeof data.newsletter === 'boolean') {
          dispatch({ type: 'SET_NEWSLETTER', payload: data.newsletter });
        }
      })
      .catch(err => {
        dispatchFetch({ type: 'SET_FETCH_ERROR', payload: err.message });
        dispatchFetch({ type: 'SET_LOADING', payload: false });
      });
  }, [dispatch]);

  // Validation
  useEffect(() => {
    dispatchForm({ type: 'SET_VALIDATION_ERRORS', payload: validateForm(state) }); // `state` is from the global context
    dispatchForm({ type: 'SET_SUCCESS', payload: false });
  }, [state]);

  // Refactored `dirty` and `isValid` into if-else statements for clarity

  let dirty = false;
  if (fetchState.loadedData) {
    dirty = JSON.stringify(state) !== JSON.stringify(fetchState.loadedData); // `state` is from the global context
  }

  let isValid = false;
  if (Object.keys(formState.validationErrors).length === 0) {
    isValid = true; // No validation errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !dirty) return;
    dispatchForm({ type: 'SET_SAVING', payload: true });
    setTimeout(() => {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: true });
    }, 1500);
  };

  if (fetchState.loading) return <div>Loading...</div>;
  if (fetchState.fetchError) return <div style={{ color: 'red' }}>{fetchState.fetchError}</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormStep step={formState.step} validationErrors={formState.validationErrors} />
      {/* <FormStepper step={formState.step} dispatchForm={dispatchForm} /> */}
      <FormSaveButton isValid={isValid} dirty={dirty} saving={formState.saving} />
      <FormSuccessMessage show={formState.success} />
    </form>
  );
};

export default UserProfileForm;
