import logo from './logo.svg';
import './App.css';
import React, { useContext, useState } from 'react';
import {useHistory, Route, Switch} from 'react-router-dom';
import { UserContext} from './context/user';
import Home from './Home'

function App() {

  const { setUser } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  function handleWelcome(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({username,password}),
    }).then((r) => {
      if(r.ok) {
        r.json().then((user) => {
          setUser(user);
          history.push('/home')
          console.log('Successful Login')
        });
      } else {
        console.log('Unable to Login')
        history.push('/home')
      }
    });
  }

  return (
    <>
      <Switch>
        <Route exact path='/home'>
          <Home />
        </Route>
      </Switch>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            <p>Login Page Practice</p>
          </h1>
          <form onSubmit={handleWelcome}>
            <div>
              <label htmlFor='username'>Username:</label>
              <input 
                type='username'
                id='username'
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input 
                type='password'
                id='password'
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
        </header>
      </div>
    </>
  );
}


export default App;
