import React, { useState, useEffect } from 'react';
import styles from './UserProfileForm.module.css';
import { UserProfileProvider, useUserProfile } from './context/UserProfileContext';
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
  const errors: Partial<typeof initialData> = {};
  if (!state.name.trim()) errors.name = 'Name is required.';
  if (!state.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = 'Invalid email address.';
  if (!state.bio.trim()) errors.bio = 'Bio is required.';
  // theme and newsletter are always valid
  return errors;
};

const UserProfileForm: React.FC = () => {
  const { state } = useUserProfile();
  const [errors, setErrors] = useState<Partial<typeof initialData>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  // Validate on state change
  useEffect(() => {
    setErrors(validate(state));
    setDirty(JSON.stringify(state) !== JSON.stringify(initialData));
    setSuccess(false);
  }, [state]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !dirty) return;
    // if no errors the proceed to submitting form
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 1200); // Simulate API call
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {step === 0 && <StepOne errors={errors} />}
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
