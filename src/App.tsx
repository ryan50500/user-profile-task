import React from 'react';
import UserProfileForm from './components/UserProfileForm/UserProfileForm';
import { UserProfileProvider } from './components/UserProfileForm/context/UserProfileContext';

const App: React.FC = () => {
  return (
    <div>
      <h1>User Profile Settings</h1>
      <UserProfileProvider>
        <UserProfileForm />
      </UserProfileProvider>
    </div>
  );
};

export default App;
