import React from 'react';
import styles from './UserProfileForm.module.css';
import { useUserProfile } from './context/UserProfileContext';
import FormStep from './steps/FormStep';
import FormSaveButton from './buttons/FormSaveButton';
import FormSuccessMessage from './notifications/FormSuccessMessage';
import { formReducer, initialFormState } from './reducers/formReducer';
import { fetchReducer, initialFetchState } from './reducers/fetchReducer';
import { useFetchUserProfile } from './hooks/useFetchUserProfile';
import { useFormHelpers } from './hooks/useFormHelpers';
import { ValidateForm } from './validation/ValidateForm';
import CancelButton from './buttons/CancelButton';
import LoadingIndicator from './loaders/LoadingIndicator';
import FetchErrorMessage from './notifications/FetchErrorMessage';

// Main User Profile form component
const UserProfileForm: React.FC = (): React.ReactElement => {
  const { state: userProfileState, dispatch } = useUserProfile();
  const [formState, dispatchForm] = React.useReducer(formReducer, initialFormState);
  const [fetchState, dispatchFetch] = React.useReducer(fetchReducer, initialFetchState);

  // Fetch user profile from API and update context + fetch state
  useFetchUserProfile(dispatchFetch, dispatch);

  // dispatch form errors that ValidateForm() returns
  React.useEffect(() => {
    const formErrors = ValidateForm(userProfileState);
    dispatchForm({ type: 'SET_VALIDATION_ERRORS', payload: formErrors });
    dispatchForm({ type: 'SET_SUCCESS', payload: false });
  }, [userProfileState]);

  // Helpers to check if form has been changed and is valid
  const { isFormDirty, isFormValid } = useFormHelpers(userProfileState, fetchState, formState);

  // Submit handler: simulate save and optionally fail 40% of the time
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !isFormDirty) return;
    dispatchForm({ type: 'SET_SAVING', payload: true });
    const shouldFail = Math.random() <= 0.4;
    if (shouldFail) {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: false });
      dispatchFetch({ type: 'SET_FETCH_ERROR', payload: 'Failed to update profile. Please try again.' });
      return;
    }
    setTimeout(() => {
      dispatchForm({ type: 'SET_SAVING', payload: false });
      dispatchForm({ type: 'SET_SUCCESS', payload: true });
    }, 2000);
  };

  // Show loading or error UI
  if (fetchState.loading) return <LoadingIndicator />;
  if (fetchState.fetchError) {
    return (
      <FetchErrorMessage
        errorMessage={fetchState.fetchError}
        dispatchForm={dispatchForm}
        dispatchFetch={dispatchFetch}
      />
    );
  }

  // Render main form
  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormStep step={formState.step} validationErrors={formState.validationErrors} />
      <FormSuccessMessage show={formState.success && !fetchState.fetchError && isFormDirty} />
      <div className={styles.buttonGroup}>
        <FormSaveButton isValid={isFormValid} isDirty={isFormDirty} saving={formState.saving} />
        <CancelButton
          isFormDirty={isFormDirty}
          loadedData={fetchState.loadedData}
          dispatch={dispatch}
        />
      </div>
    </form>
  );
};

export default UserProfileForm;