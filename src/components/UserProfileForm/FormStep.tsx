import React from 'react';

import StepOne from './StepOne';
import StepTwo from './StepTwo';

// - step: Indicates the current step of the form
// - validationErrors: Contains validation error messages for form fields
interface FormStepProps {
  step: number;
  validationErrors: Partial<{
    name: string; 
    email: string; 
    bio: string; 
    theme: string; 
    newsletter: boolean; 
  }>;
}

// FormStep component dynamically renders StepOne or StepTwo based on the current step
const FormStep: React.FC<FormStepProps> = ({ step, validationErrors }) => {
  // Render StepOne component if the current step is 0
  if (step === 0) return <StepOne validationErrors={validationErrors} />;

  // Render StepTwo component if the current step is 1
  // (StepTwo is dummy component to show form can be a multiform)
  if (step === 1) return <StepTwo />;

  // Return null if the step is not recognized
  return null;
};

export default FormStep;
