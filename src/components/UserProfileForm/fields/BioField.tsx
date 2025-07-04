import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

interface BioFieldProps {
  error?: string;
}

const BioField: React.FC<BioFieldProps> = ({ error }) => {
  const { state, dispatch } = useUserProfile();
  return (
    <label>
      Bio
      <textarea
        value={state.bio}
        onChange={e => dispatch({ type: 'SET_BIO', payload: e.target.value })}
        placeholder="Tell us about yourself"
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.95em', marginTop: 2 }}>{error}</span>}
    </label>
  );
};

export default BioField;
