import React from 'react';
import { UserProfileAction, UserProfileState } from '../context/UserProfileContext';
// Importing CSS module for styling the button group
import styles from '../UserProfileForm.module.css';

interface CancelButtonProps {
  isFormDirty: boolean;
  loadedData: UserProfileState | null;
  dispatch: React.Dispatch<UserProfileAction>;
}

const CancelButton: React.FC<CancelButtonProps> = ({ isFormDirty, loadedData, dispatch }) => {
  const handleCancel = () => {
    if (loadedData) {
      dispatch({ type: 'SET_NAME', payload: loadedData.name });
      dispatch({ type: 'SET_EMAIL', payload: loadedData.email });
      dispatch({ type: 'SET_BIO', payload: loadedData.bio });
      dispatch({ type: 'SET_THEME', payload: loadedData.theme });
      dispatch({ type: 'SET_NEWSLETTER', payload: loadedData.newsletter });
      dispatch({ type: 'SET_SUCCESS', payload: false }); // Reset success state
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={!isFormDirty}
      className={`${!isFormDirty ? styles.disabled : ''} ${styles.cancelButton}`}
      style={{ marginTop: '1rem' }}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
