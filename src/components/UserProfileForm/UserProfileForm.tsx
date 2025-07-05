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
  saving: boolean;
  success: boolean;
  step: number;
}

export type FormAction =
  | { type: 'SET_VALIDATION_ERRORS'; payload: Partial<typeof initialData> }
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
  const { state, dispatch } = useUserProfile();
  // is initialFormState coming from the state in formReducer??? and what exactly is the state in formReducer reffering to???
  // is initialFormState coming from the state in formReducer??? and what exactly is the state in formReducer reffering to???
  // is initialFormState coming from the state in formReducer??? and what exactly is the state in formReducer reffering to???
  const [formState, dispatchForm] = React.useReducer(formReducer, initialFormState);
  const [loadedData, setLoadedData] = React.useState<typeof initialData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  // Fetch initial data from json-server
  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    fetch('http://localhost:3001/userProfile')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user profile');
        return res.json();
      })
      .then(data => {
        setLoadedData(data);
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
        setLoading(false);
      })
      .catch(err => {
        setFetchError(err.message);
        setLoading(false);
      });
  }, [dispatch]);

  // Validation
  useEffect(() => {
    dispatchForm({ type: 'SET_VALIDATION_ERRORS', payload: validateForm(state) });
    dispatchForm({ type: 'SET_SUCCESS', payload: false });
  }, [state]);


  const dirty = loadedData ? JSON.stringify(state) !== JSON.stringify(loadedData) : false;
  const isValid = Object.keys(formState.validationErrors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !dirty) return;
    dispatchForm({ type: 'SET_SAVING', payload: true });
    setTimeout(() => {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: true });
    }, 1500);
  };

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div style={{ color: 'red' }}>{fetchError}</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormStep step={formState.step} validationErrors={formState.validationErrors} />
      <FormStepper step={formState.step} dispatchForm={dispatchForm} />
      <FormSaveButton isValid={isValid} dirty={dirty} saving={formState.saving} />
      <FormSuccessMessage show={formState.success} />
    </form>
  );
};

export default UserProfileForm;
