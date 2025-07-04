import React from 'react';
import NameField from './fields/NameField';
import EmailField from './fields/EmailField';
import BioField from './fields/BioField';
import PreferredThemeField from './fields/PreferredThemeField';
import ReceiveNewsletterField from './fields/ReceiveNewsletterField';

// Use a local type for errors prop
interface StepOneProps {
  errors?: {
    name?: string;
    email?: string;
    bio?: string;
  };
}

const StepOne: React.FC<StepOneProps> = ({ errors = {} }) => (
  <>
    <NameField error={errors.name} />
    <EmailField error={errors.email} />
    <BioField error={errors.bio} />
    <PreferredThemeField />
    <ReceiveNewsletterField />
  </>
);

export default StepOne;
