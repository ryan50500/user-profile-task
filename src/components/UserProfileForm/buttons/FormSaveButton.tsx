import React from 'react';
import baseStyles from './ButtonBase.module.css';
import styles from './FormSaveButton.module.css';

interface FormSaveButtonProps {
  isValid: boolean; // True if the form passes validation
  isDirty: boolean; // True if there are unsaved changes in the form
  saving: boolean; // True if the form is in the process of saving
}

// FormSaveButton component renders a button for saving form changes
// The button is disabled if the form is invalid, has no unsaved changes, or is currently saving
const FormSaveButton: React.FC<FormSaveButtonProps> = ({ isValid, isDirty, saving }) => {
  return (
    <div>
      <button
        type="submit"
        disabled={!isDirty || saving || !isValid} // The button is disabled if:
                                          // - There are no unsaved changes (!isDirty)
                                          // - The form is currently saving (saving)
                                          // - The form is invalid (!isValid)
        aria-disabled={!isDirty || saving || !isValid} // Ensure screen readers recognize the disabled state
        aria-live="polite" // Notify screen readers of dynamic text changes
        className={
          `${baseStyles.buttonBase} ${styles.saveButton} ${(!isDirty || saving || !isValid) ? baseStyles.disabled : ''}`
        } // Apply base, save-specific, and disabled styles conditionally
      >
        {saving ? 'Saving...' : 'Save Changes'} 
      </button>
    </div>
  );
};

export default FormSaveButton;