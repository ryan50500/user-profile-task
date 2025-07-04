// Renamed from ReceiveNewsletterField.jsx to ReceiveNewsletterField.tsx
import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import styles from '../UserProfileForm.module.css';

const ReceiveNewsletterField: React.FC = () => {
  const { state, dispatch } = useUserProfile();
  return (
   <label className={styles.newsletterLabel}>
      <input
        type="checkbox"
        checked={state.newsletter}
        onChange={e => dispatch({ type: 'SET_NEWSLETTER', payload: e.target.checked })}
      />
      Receive Newsletter
    </label>
  );
};

export default ReceiveNewsletterField;
