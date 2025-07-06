import React from 'react';
import styles from './UserProfileForm.module.css';

interface FormFailedMessageProps {
  show: boolean;
  message?: string;
}

const FormFailedMessage: React.FC<FormFailedMessageProps> = ({ show, message = 'Failed to update profile. Please try again.' }) => {
  if (!show) return null;
  return <div className={styles.errorMsg}>{message}</div>;
};

export default FormFailedMessage;
