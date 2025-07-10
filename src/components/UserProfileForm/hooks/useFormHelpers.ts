import { UserProfileState, UserProfileAction } from '../context/UserProfileContext';
import { FetchState } from '../reducers/fetchReducer';
import { FormState } from '../reducers/formReducer';


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

export const resetFormFields = (
  loadedData: UserProfileState | null,
  dispatch: React.Dispatch<UserProfileAction>
) => {
  if (loadedData) {
    dispatch({ type: 'SET_NAME', payload: loadedData.name });
    dispatch({ type: 'SET_EMAIL', payload: loadedData.email });
    dispatch({ type: 'SET_BIO', payload: loadedData.bio });
    dispatch({ type: 'SET_THEME', payload: loadedData.theme });
    dispatch({ type: 'SET_NEWSLETTER', payload: loadedData.newsletter });
  }
};

