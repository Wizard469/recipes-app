import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/foods" component={ Comidas } />
          <Route exact path="/" component={ Login } />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
