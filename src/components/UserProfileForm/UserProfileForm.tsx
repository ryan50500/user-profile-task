import React, { useState, useEffect } from 'react';
import styles from './UserProfileForm.module.css';
import { useUserProfile } from './context/UserProfileContext';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepButtons from './StepButtons';

// Initial data for dirty check (simulate loaded data)
const initialData = {
  name: '',
  email: '',
  bio: '',
  theme: 'light',
  newsletter: false,
};

const validate = (state: typeof initialData) => {
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
  // local state
  const [validationErrors, setValidationErrors] = useState<Partial<typeof initialData>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // pass in temporary error object to setValidationErrors
    setValidationErrors(validate(state));
    setDirty(JSON.stringify(state) !== JSON.stringify(initialData));
    setSuccess(false);
  }, [state]);

  // Check if there are no validation errors
  const isValid = Object.keys(validationErrors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If there are validation errors or form is not dirty, do not submit
    if (!isValid || !dirty) return;
    // if no errors the proceed to submitting form
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 1500); // Simulate API call
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {step === 0 && <StepOne validationErrors={validationErrors} />}
      {step === 1 && <StepTwo />}
      {step !== 0 && <StepButtons step={step} next={next} prev={prev} />}
      <div className={styles.buttonGroup}>
        <button type="submit" disabled={!isValid || !dirty || saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {success && <div className={styles.successMsg}>Profile updated successfully!</div>}
    </form>
  );
};

export default UserProfileForm;
