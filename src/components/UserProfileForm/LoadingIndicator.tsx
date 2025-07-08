import React from 'react';
import styles from './LoadingIndicator.module.css'; // Import dedicated CSS module

const LoadingIndicator: React.FC = () => {
  return (
    <div
      className={styles.loadingContainer} // Center the loading indicator
      role="status" // Mark as a status update for screen readers
      aria-live="assertive" // Notify screen readers immediately
    >
      <div className={styles.spinner}></div> {/* Spinner element */}
      <span>Loading...</span>
    </div>
  );
};

export default LoadingIndicator;
