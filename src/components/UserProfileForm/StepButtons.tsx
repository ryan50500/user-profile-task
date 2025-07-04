import React from 'react';
import styles from './UserProfileForm.module.css';

type StepButtonsProps = {
  step: number;
  next: () => void;
  prev: () => void;
};

const StepButtons: React.FC<StepButtonsProps> = ({ step, next, prev }) => (
  <div className={styles.buttonGroup}>
    {step > 0 && (
      <button type="button" onClick={prev}>
        Back
      </button>
    )}
    {step < 1 && (
      <button type="button" onClick={next}>
        Next
      </button>
    )}
    {step === 1 && <button type="submit">Save</button>}
  </div>
);

export default StepButtons;
