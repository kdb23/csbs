import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import { UserContext} from './context/user';
import Home from './Home'
import PeopleContainer from './PeopleContainer';

function App() {

  const [members, setMembers] = useState([])

  useEffect(() => {
      fetch('/members')
          .then((r) => r.json())
          .then((setMembers))
          .catch((error) => {
              console.log('Error Fetching Member Information', error)
          })
  }, [])

  return (
    <>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/home/members">
          <PeopleContainer members={members} />
        </Route>
      </Switch>
    </>
  
  );
}


export default App;
