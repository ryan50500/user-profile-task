import { useEffect } from 'react';
import { UserProfileAction } from '../context/UserProfileContext';
import { FetchAction } from '../reducers/fetchReducer';

// Custom hook to fetch user profile data and update state
// - Manages fetch state (loading, error, loaded data)
// - Updates global user profile state with fetched data
// - Simulates a random error 40% of the time
export const useFetchUserProfile = (
  dispatchFetch: React.Dispatch<FetchAction>, // Dispatch function for fetch state
  dispatchUserProfile: React.Dispatch<UserProfileAction> // Dispatch function for user profile state
) => {
  useEffect(() => {
    // Create an AbortController instance to control/cancel the fetch
    const controller = new AbortController();
    const { signal } = controller;

    // Set loading state to true and clear any previous errors
    dispatchFetch({ type: 'SET_LOADING', payload: true });
    dispatchFetch({ type: 'SET_FETCH_ERROR', payload: null });

    // Start fetching the user profile
    fetch('http://localhost:3001/userProfile', { signal })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user profile');
        }
        return res.json(); // Parse JSON response
      })
      .then(data => {
        // Update fetch state with loaded data from the json-server mock API and set loading to false
        dispatchFetch({ type: 'SET_LOADED_DATA', payload: data });
        dispatchFetch({ type: 'SET_LOADING', payload: false });

        // Update user profile state with fetched data
        if (typeof data.name === 'string') {
          dispatchUserProfile({ type: 'SET_NAME', payload: data.name });
        }
        if (typeof data.email === 'string') {
          dispatchUserProfile({ type: 'SET_EMAIL', payload: data.email });
        }
        if (typeof data.bio === 'string') {
          dispatchUserProfile({ type: 'SET_BIO', payload: data.bio });
        }
        if (typeof data.theme === 'string') {
          dispatchUserProfile({ type: 'SET_THEME', payload: data.theme });
        }
        if (typeof data.newsletter === 'boolean') {
          dispatchUserProfile({ type: 'SET_NEWSLETTER', payload: data.newsletter });
        }
      })
      .catch(err => {
        // If the fetch was aborted, we silently ignore the error
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          return; // Return from this catch block
        }
        // Handle fetch errors and update fetch state
        dispatchFetch({ type: 'SET_FETCH_ERROR', payload: err.message });
        dispatchFetch({ type: 'SET_LOADING', payload: false });
      });

    // Cleanup function to abort fetch if component unmounts
    return () => {
      controller.abort();
    };
  }, [dispatchFetch, dispatchUserProfile]); 
};
