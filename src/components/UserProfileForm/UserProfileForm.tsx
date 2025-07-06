import React, { useEffect } from 'react';
import styles from './UserProfileForm.module.css';
import { useUserProfile, UserProfileState } from './context/UserProfileContext';
import FormStep from './FormStep';
import FormStepper from './FormStepper';
import FormSaveButton from './FormSaveButton';
import FormSuccessMessage from './FormSuccessMessage';

// Importing reducers and their initial states
import { formReducer, initialFormState } from './reducers/formReducer';
import { fetchReducer, initialFetchState } from './reducers/fetchReducer';

// Importing validation logic
import { validateForm } from './validation';

const UserProfileForm: React.FC = () => {
   // `state` refers to the global context of User Profile Form
  const { state: userProfileState, dispatch } = useUserProfile();
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
    const formErrors = validateForm(userProfileState); 
    dispatchForm({ type: 'SET_VALIDATION_ERRORS', payload: formErrors });
    dispatchForm({ type: 'SET_SUCCESS', payload: false });
  }, [userProfileState]);

  // Helper function to check if the form is dirty
  const isFormDirty = (): boolean => {
    return !!fetchState.loadedData && JSON.stringify(userProfileState) !== JSON.stringify(fetchState.loadedData);
  };

  // Helper function to check if the form is valid
  const isFormValid = (): boolean => {
    return Object.keys(formState.validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dirty = isFormDirty();
    const valid = isFormValid();
    if (!valid || !dirty) return;

    dispatchForm({ type: 'SET_SAVING', payload: true });
    setTimeout(() => {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: true });
    }, 2000);
  };

  if (fetchState.loading) return <div>Loading...</div>;
  if (fetchState.fetchError) return <div style={{ color: 'red' }}>{fetchState.fetchError}</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormStep step={formState.step} validationErrors={formState.validationErrors} />
      {/* <FormStepper step={formState.step} dispatchForm={dispatchForm} /> */}
      <FormSaveButton isValid={isFormValid()} dirty={isFormDirty()} saving={formState.saving} />
      <FormSuccessMessage show={formState.success} />
    </form>
  );
};

export default UserProfileForm;
