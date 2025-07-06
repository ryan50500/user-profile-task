import { UserProfileState } from '../context/UserProfileContext';
import { FetchState } from '../reducers/fetchReducer';
import { FormState } from '../reducers/formReducer';

export const isFormDirty = (
  userProfileState: UserProfileState,
  fetchState: FetchState
): boolean => {
  return !!fetchState.loadedData && JSON.stringify(userProfileState) !== JSON.stringify(fetchState.loadedData);
};

export const isFormValid = (formState: FormState): boolean => {
  return Object.keys(formState.validationErrors).length === 0;
};

// Custom hook to encapsulate form helper logic
// - Provides `isFormDirty` and `isFormValid` as calculated values based on the current state
export const useFormHelpers = (
  userProfileState: UserProfileState,
  fetchState: FetchState,
  formState: FormState
) => {
  // `!!` is used to convert a value to a boolean
  const isFormDirty = !!fetchState.loadedData && JSON.stringify(userProfileState) !== JSON.stringify(fetchState.loadedData);
  // Checks if there are no validation errors in the form
  const isFormValid = Object.keys(formState.validationErrors).length === 0;

  return { isFormDirty, isFormValid };
};
