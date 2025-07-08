import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface BioFieldProps {
  error?: string;
}

const BioField: React.FC<BioFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  const errorId = error ? 'bio-error' : undefined; // Unique ID for the error message

  return (
    <label htmlFor="bio">
      Bio
      <textarea
        id="bio" // Associate the label with the input field
        value={state.bio}
        onChange={e => dispatch({ type: 'SET_BIO', payload: e.target.value })}
        placeholder="Tell us about yourself"
        aria-describedby={errorId} // Link the error message to the input field
      />
      {error && (
        <span
          id="bio-error" // Unique ID for the error message
          style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}
          aria-live="polite" // Announce dynamic changes to the error message
        >
          {error}
        </span>
      )}
    </label>
  );
};

export default BioField;
