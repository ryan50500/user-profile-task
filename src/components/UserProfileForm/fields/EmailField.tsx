import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface EmailFieldProps {
  error?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  return (
    <label>
      Email
      <input
        type="email"
        value={state.email}
        onChange={e => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
        placeholder="Enter your email"
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}>{error}</span>}
    </label>
  );
};

export default EmailField;
