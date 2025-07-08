// - Checks each field in the state for validity
// - Returns an object containing validation error messages for invalid fields
import { UserProfileState } from '../context/UserProfileContext';

export function ValidateForm(state: UserProfileState): Partial<UserProfileState> {
  const temporaryErrors: Partial<UserProfileState> = {}; 
  if (!state.name.trim()) temporaryErrors.name = 'Name is required.';
  if (!state.email.trim()) temporaryErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) temporaryErrors.email = 'Invalid email address.';
  if (!state.bio.trim()) temporaryErrors.bio = 'Bio is required.';
  return temporaryErrors;
}
