// - Checks each field in the state for validity
// - Returns an object containing validation error messages for invalid fields
import { UserProfileState } from './context/UserProfileContext';

export function ValidateForm(state: UserProfileState): Partial<UserProfileState> {
  // - The temporaryErrors object is used to collect errors during validation and is discarded after the function returns
  const temporaryErrors: Partial<UserProfileState> = {}; 

  // - Name is required and cannot be empty
  if (!state.name.trim()) temporaryErrors.name = 'Name is required.';

  // - Email is required and must follow a valid email format
  if (!state.email.trim()) temporaryErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) temporaryErrors.email = 'Invalid email address.';

  // - Bio is required and cannot be empty
  if (!state.bio.trim()) temporaryErrors.bio = 'Bio is required.';

//   Return any validation errors
  return temporaryErrors; // temporaryErrors object is returned and discarded
}
