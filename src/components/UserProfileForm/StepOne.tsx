import React from 'react';
import NameField from './fields/NameField';
import EmailField from './fields/EmailField';
import BioField from './fields/BioField';
import PreferredThemeField from './fields/PreferredThemeField';
import ReceiveNewsletterField from './fields/ReceiveNewsletterField';

// Use a local type for errors prop
interface StepOneProps {
  validationErrors?: {
    name?: string;
    email?: string;
    bio?: string;
  };
}

const StepOne: React.FC<StepOneProps> = ({ validationErrors = {} }) => (
  <>
    <NameField error={validationErrors.name} />
    <EmailField error={validationErrors.email} />
    <BioField error={validationErrors.bio} />
    <PreferredThemeField />
    <ReceiveNewsletterField />
  </>
);

export default StepOne;
