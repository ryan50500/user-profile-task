// Renamed from PreferredThemeField.jsx to PreferredThemeField.tsx
import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';

const PreferredThemeField: React.FC = () => {
  const { state, dispatch } = useUserProfile();
  return (
    <label>
      Preferred Theme
      <select value={state.theme} onChange={e => dispatch({ type: 'SET_THEME', payload: e.target.value })}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
};

export default PreferredThemeField;
