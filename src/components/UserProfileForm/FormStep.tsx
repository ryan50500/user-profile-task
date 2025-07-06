// Importing React library for building UI components
import React from 'react';

// Importing StepOne and StepTwo components for rendering different steps of the form
import StepOne from './StepOne';
import StepTwo from './StepTwo';

// Defining the props interface for the FormStep component
// - step: Indicates the current step of the form
// - validationErrors: Contains validation error messages for form fields
interface FormStepProps {
  step: number;
  validationErrors: Partial<{
    name: string; // Validation error for the name field
    email: string; // Validation error for the email field
    bio: string; // Validation error for the bio field
    theme: string; // Validation error for the theme field
    newsletter: boolean; // Validation error for the newsletter field
  }>;
}

// FormStep component dynamically renders StepOne or StepTwo based on the current step
const FormStep: React.FC<FormStepProps> = ({ step, validationErrors }) => {
  // Render StepOne if the current step is 0, passing validationErrors as props
  if (step === 0) return <StepOne validationErrors={validationErrors} />;

  // Render StepTwo if the current step is 1
  if (step === 1) return <StepTwo />;

  // Return null if the step is not recognized
  return null;
};

// Exporting FormStep component for use in other parts of the application
export default FormStep;
