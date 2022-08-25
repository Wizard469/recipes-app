import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import DrinkDetails from './components/DrinkDetails';
import FoodDetails from './components/FoodDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        {/* <Route exact path="/drinks/{id-da-receita}/in-progress" component={ Drinks } /> */}
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        {/* <Route exact path="/foods/{id-da-receita}/in-progress" component={ Foods } /> */}
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
