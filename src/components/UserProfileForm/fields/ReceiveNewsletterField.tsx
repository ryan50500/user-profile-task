// Renamed from ReceiveNewsletterField.jsx to ReceiveNewsletterField.tsx
import React from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import styles from '../UserProfileForm.module.css';

const ReceiveNewsletterField: React.FC = () => {
  const { state, dispatch } = useUserProfile();
  return (
    <label htmlFor="receive-newsletter" className={styles.newsletterLabel}>
      <input
        type="checkbox"
        id="receive-newsletter"
        checked={state.newsletter}
        onChange={e => dispatch({ type: 'SET_NEWSLETTER', payload: e.target.checked })}
      />
      Receive Newsletter
    </label>
  );
};

export default ReceiveNewsletterField;
