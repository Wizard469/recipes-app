import React from 'react';
import Header from './Header';

function DoneRecipes() {
  return (
    <div>
      <Header pageTitle="Done Recipes" showSearch={ false } />
      <h1 data-testid="page-title">Done Recipes</h1>
    </div>
  );
}

export default DoneRecipes;
