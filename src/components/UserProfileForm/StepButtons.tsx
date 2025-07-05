import React from 'react';
import type { FormAction } from './UserProfileForm';
import styles from './UserProfileForm.module.css';

interface StepButtonsProps {
  step: number;
  dispatchForm: React.Dispatch<FormAction>;
}

const StepButtons: React.FC<StepButtonsProps> = ({ step, dispatchForm }) => {
  const next = () => dispatchForm({ type: 'SET_STEP', payload: step + 1 });
  const prev = () => dispatchForm({ type: 'SET_STEP', payload: step - 1 });

  return (
    <div className={styles.buttonGroup}>
      <button type="button" onClick={prev} disabled={step === 0}>
        Back
      </button>
      <button type="button" onClick={next}>
        {step < 1 ? 'Next' : 'Save'}
      </button>
    </div>
  );
};

export default StepButtons;
