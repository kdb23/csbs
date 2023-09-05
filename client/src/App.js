import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { UserContext} from './context/user';
import Home from './Home'
import PeopleContainer from './PeopleContainer';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/home/members">
          <PeopleContainer />
        </Route>
      </Switch>
    </>
  
  );
}


export default App;
