import React from 'react';
import styles from '../UserProfileForm.module.css';

interface FormSuccessMessageProps {
  show: boolean;
  message?: string;
}

const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({ show, message = 'Profile updated successfully!' }) => {
  if (!show) return null;
  return (
    <div
      className={styles.successMsg}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default FormSuccessMessage;
