import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface NameFieldProps {
  error?: string;
}

const NameField: React.FC<NameFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  return (
    <label>
      Name
      <input
        type="text"
        value={state.name}
        onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })}
        placeholder="Enter your name"
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}>{error}</span>}
    </label>
  );
};

export default NameField;
