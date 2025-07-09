import React from 'react';
import baseStyles from './ButtonBase.module.css';
import styles from './FormSaveButton.module.css';

interface FormSaveButtonProps {
  isValid: boolean; // True if the form passes validation
  isDirty: boolean; // True if there are unsaved changes in the form
  saving: boolean; // True if the form is in the process of saving
}

const FormSaveButton: React.FC<FormSaveButtonProps> = ({ isValid, isDirty, saving }) => {
  return (
    <div>
      <button
        type="submit"
        /*
          The button is disabled if:
          - There are no unsaved changes (!isDirty)
          - The form is currently saving (saving)
          - The form is invalid (!isValid)
        */
        disabled={!isDirty || saving || !isValid}
        className={
          `${baseStyles.buttonBase} ${styles.saveButton} ${(!isDirty || saving || !isValid) ? baseStyles.disabled : ''}`
        }
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default FormSaveButton;