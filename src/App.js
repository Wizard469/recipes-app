import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './Pages/Login';
import RecipeInProgress from './Pages/RecipeInProgress';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import CategoryProvider from './context/CategoryProvider';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Provider>
          <CategoryProvider>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
            <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          </CategoryProvider>
        </Provider>
      </Switch>
    </div>
  );
}

export default App;
