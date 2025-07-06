// Importing React library for building UI components
import React, { useEffect, useState } from 'react';

// Importing CSS module for styling the button group
import styles from './UserProfileForm.module.css';

// Defining the props interface for the FormSaveButton component
// - isValid: Indicates whether the form is valid
// - dirty: Indicates whether the form has unsaved changes
// - saving: Indicates whether the form is currently being saved
interface FormSaveButtonProps {
  isValid: boolean; // True if the form passes validation
  dirty: boolean; // True if there are unsaved changes in the form
  saving: boolean; // True if the form is in the process of saving
}

// FormSaveButton component renders a button for saving form changes
// The button is disabled if the form is invalid, has no unsaved changes, or is currently saving
const FormSaveButton: React.FC<FormSaveButtonProps> = ({ isValid, dirty, saving }) => {

  return (
    <div className={styles.buttonGroup}> {/* Container for the button group */}
      <button
        type="submit"
        disabled={!dirty || saving || !isValid} // Button is disabled based on local state and props
        className={`${styles.saveButton} ${(!dirty || saving || !isValid) ? styles.disabled : ''}`} // Apply disabled styles conditionally
      >
        {saving ? 'Saving...' : 'Save Changes'} {/* Button text changes based on saving state */}
      </button>
    </div>
  );
};

// Exporting FormSaveButton component for use in other parts of the application
export default FormSaveButton;
