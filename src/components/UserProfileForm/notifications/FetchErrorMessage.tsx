import React from 'react';
import { UserProfileAction } from '../context/UserProfileContext';
import { FetchAction } from '../reducers/fetchReducer';
import { FormAction } from '../reducers/formReducer';

interface FetchErrorMessageProps {
  errorMessage: string;
  dispatchForm: React.Dispatch<FormAction>;
  dispatchFetch: React.Dispatch<FetchAction>;
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({ errorMessage, dispatchForm, dispatchFetch }) => {
  const handleBack = () => {
    dispatchForm({ type: 'RESET_FORM' });
    dispatchFetch({ type: 'SET_FETCH_ERROR', payload: null });
    dispatchFetch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <div
      style={{
        color: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      role="alert"
      aria-live="polite"
    >
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
