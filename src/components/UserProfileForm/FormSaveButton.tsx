import React from 'react';
import styles from './UserProfileForm.module.css';

interface FormSaveButtonProps {
  isValid: boolean;
  dirty: boolean;
  saving: boolean;
}

const FormSaveButton: React.FC<FormSaveButtonProps> = ({ isValid, dirty, saving }) => (
  <div className={styles.buttonGroup}>
    <button type="submit" disabled={!isValid || !dirty || saving}>
      {saving ? 'Saving...' : 'Save Changes'}
    </button>
  </div>
);

export default FormSaveButton;
