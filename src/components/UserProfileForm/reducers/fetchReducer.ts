// Reducer for managing fetch-related state
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
      return { ...state, loadedData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FETCH_ERROR':
      return { ...state, fetchError: action.payload };
    default:
      return state;
  }
}
