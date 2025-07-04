import React from 'react';
import NameField from './fields/NameField';
import EmailField from './fields/EmailField';
import BioField from './fields/BioField';
import PreferredThemeField from './fields/PreferredThemeField';
import ReceiveNewsletterField from './fields/ReceiveNewsletterField';

const StepOne: React.FC = () => (
  <>
    <NameField />
    <EmailField />
    <BioField />
    <PreferredThemeField />
    <ReceiveNewsletterField />
  </>
);

export default StepOne;
