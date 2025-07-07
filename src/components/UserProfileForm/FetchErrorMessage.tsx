import React from 'react';
import { UserProfileAction } from './context/UserProfileContext';

interface FetchErrorMessageProps {
  errorMessage: string;
  dispatchForm: React.Dispatch<any>;
  dispatchFetch: React.Dispatch<any>;
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({ errorMessage, dispatchForm, dispatchFetch }) => {
  const handleBack = () => {
    dispatchForm({ type: 'RESET_FORM' });
    dispatchFetch({ type: 'SET_FETCH_ERROR', payload: null });
    dispatchFetch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
      <button
        type="button"
        onClick={handleBack}
        style={{ marginTop: '1rem' }}
      >
        Back
      </button>
    </div>
  );
};

export default FetchErrorMessage;
