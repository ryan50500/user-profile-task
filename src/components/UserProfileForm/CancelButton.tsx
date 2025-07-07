import React from 'react';
import { UserProfileAction, UserProfileState } from './context/UserProfileContext';

interface CancelButtonProps {
  isFormDirty: boolean;
  loadedData: UserProfileState | null;
  dispatch: React.Dispatch<UserProfileAction>;
}

const CancelButton: React.FC<CancelButtonProps> = ({ isFormDirty, loadedData, dispatch }) => {
  if (!isFormDirty) return null;

  const handleCancel = () => {
    if (loadedData) {
      dispatch({ type: 'SET_NAME', payload: loadedData.name });
      dispatch({ type: 'SET_EMAIL', payload: loadedData.email });
      dispatch({ type: 'SET_BIO', payload: loadedData.bio });
      dispatch({ type: 'SET_THEME', payload: loadedData.theme });
      dispatch({ type: 'SET_NEWSLETTER', payload: loadedData.newsletter });
    }
  };

  return (
    <button type="button" onClick={handleCancel} style={{ marginTop: '1rem' }}>
      Cancel
    </button>
  );
};

export default CancelButton;
