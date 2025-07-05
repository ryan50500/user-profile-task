import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

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

const FormStep: React.FC<FormStepProps> = ({ step, validationErrors }) => {
  if (step === 0) return <StepOne validationErrors={validationErrors} />;
  if (step === 1) return <StepTwo />;
  return null;
};

export default FormStep;
