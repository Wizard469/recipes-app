import React from 'react';
import Header from './Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header pageTitle="Favorite Recipes" showSearch={ false } />
      <h1 data-testid="page-title">Favorite Recipes</h1>
    </div>
  );
}

export default FavoriteRecipes;
