// Reducer for managing fetch-related state
// - Handles actions to update loading, error, and loaded data states
// - Used in conjunction with the useFetchUserProfile hook

import { UserProfileState } from '../context/UserProfileContext';

// Fetch state type
export interface FetchState {
  loadedData: UserProfileState | null;
  loading: boolean;
  fetchError: string | null;
}

export type FetchAction =
  | { type: 'SET_LOADED_DATA'; payload: UserProfileState | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FETCH_ERROR'; payload: string | null };

export const initialFetchState: FetchState = {
  loadedData: null,
  loading: true,
  fetchError: null,
};

export function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'SET_LOADED_DATA':
      // Updates the state with the fetched data
      return { ...state, loadedData: action.payload };
    case 'SET_LOADING':
      // Updates the loading state (true or false)
      return { ...state, loading: action.payload };
    case 'SET_FETCH_ERROR':
      // Updates the error state with the error message
      return { ...state, fetchError: action.payload };
    default:
      // Returns the current state if the action type is unrecognized
      return state;
  }
}
