import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface EmailFieldProps {
  error?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  const errorId = error ? 'email-error' : undefined; // Unique ID for the error message

  return (
    <label htmlFor="email">
      Email
      <input
        type="email"
        id="email" // Associate the label with the input field
        value={state.email}
        onChange={e => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
        placeholder="Enter your email"
        aria-describedby={errorId} // Link the error message to the input field
      />
      {error && (
        <span
          id="email-error" // Unique ID for the error message
          style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}
          aria-live="polite" // Announce dynamic changes to the error message
        >
          {error}
        </span>
      )}
    </label>
  );
};

export default EmailField;
