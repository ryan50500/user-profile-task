// SaveButton.tsx
import React from 'react';
import styles from './UserProfileForm.module.css';

interface SaveButtonProps {
  isValid: boolean;
  dirty: boolean;
  saving: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isValid, dirty, saving }) => (
  <div className={styles.buttonGroup}>
    <button type="submit" disabled={!isValid || !dirty || saving}>
      {saving ? 'Saving...' : 'Save Changes'}
    </button>
  </div>
);

export default SaveButton;