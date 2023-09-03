import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { UserContext} from './context/user';
import Home from './Home'

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </>
  
  );
}


export default App;
