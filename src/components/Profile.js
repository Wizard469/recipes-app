import React from 'react';
import Header from './Header';

function Profile() {
  return (
    <div>
      <Header pageTitle="Profile" showSearch={ false } />
      <h1 data-testid="page-title">Profile</h1>
    </div>
  );
}

export default Profile;
