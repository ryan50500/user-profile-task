import React from 'react';
import { FormAction } from '../reducers/formReducer';

interface FormStepperProps {
  step: number;
  dispatchForm: React.Dispatch<FormAction>;
}

const FormStepper: React.FC<FormStepperProps> = ({ step, dispatchForm }) => {
  const next = () => dispatchForm({ type: 'SET_STEP', payload: step + 1 });
  const prev = () => dispatchForm({ type: 'SET_STEP', payload: step - 1 });
  return (
    <div>
      <button type="button" onClick={prev} disabled={step === 0}>Previous</button>
      <button type="button" onClick={next}>Next</button>
    </div>
  );
};

export default FormStepper;
