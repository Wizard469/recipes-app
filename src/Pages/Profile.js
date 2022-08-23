import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header pageTitle="Profile" showSearch={ false } />
      <h1 data-testid="page-title">Profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
