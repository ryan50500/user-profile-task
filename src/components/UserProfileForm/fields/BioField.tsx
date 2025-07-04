import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

const BioField: React.FC = () => {
  const { state, dispatch } = useUserProfile();
  return (
    <label>
      Bio
      <textarea
        value={state.bio}
        onChange={e => dispatch({ type: 'SET_BIO', payload: e.target.value })}
        placeholder="Tell us about yourself"
      />
    </label>
  );
};

export default BioField;
