import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface NameFieldProps {
  error?: string;
}

const NameField: React.FC<NameFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  const errorId = error ? 'name-error' : undefined; // Unique ID for the error message

  return (
    <label htmlFor="name">
      Name
      <input
        type="text"
        id="name" // Associate the label with the input field
        value={state.name}
        onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })}
        placeholder="Enter your name"
        aria-describedby={errorId} // Link the error message to the input field
      />
      {error && (
        <span
          id="name-error" // Unique ID for the error message
          style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}
          aria-live="polite" // Announce dynamic changes to the error message
        >
          {error}
        </span>
      )}
    </label>
  );
};

export default NameField;
