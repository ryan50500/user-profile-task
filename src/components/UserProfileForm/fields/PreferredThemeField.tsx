import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

const PreferredThemeField: React.FC = () => {
  const { state, dispatch } = useUserProfile();
  return (
    <label htmlFor="preferred-theme">
      Preferred Theme
      <select
        id="preferred-theme"
        value={state.theme}
        onChange={e => dispatch({ type: 'SET_THEME', payload: e.target.value })}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
};

export default PreferredThemeField;
