// Function to validate the user profile form
// - Checks each field in the state for validity
// - Returns an object containing validation error messages for invalid fields
import { UserProfileState } from './context/UserProfileContext';

export function validateForm(state: UserProfileState): Partial<UserProfileState> {
  const temporaryErrors: Partial<UserProfileState> = {}; // Object to store validation errors

  // Validate the name field
  // - Name is required and cannot be empty
  if (!state.name.trim()) temporaryErrors.name = 'Name is required.';

  // Validate the email field
  // - Email is required and must follow a valid email format
  if (!state.email.trim()) temporaryErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) temporaryErrors.email = 'Invalid email address.';

  // Validate the bio field
  // - Bio is required and cannot be empty
  if (!state.bio.trim()) temporaryErrors.bio = 'Bio is required.';

  return temporaryErrors; // Return the validation errors
}
