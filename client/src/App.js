import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home'
import PeopleContainer from './PeopleContainer';
import PrayerContainer from './PrayerContainer';
import NavBar from './NavBar';
import NewMember from './NewMember';

function App() {

  const [members, setMembers] = useState([])
  const [prayers, setPrayers] = useState([])
  const [findMember, setFindMember] = useState('')

  useEffect(() => {
      fetch('/members')
          .then((r) => r.json())
          .then((setMembers))
          .catch((error) => {
              console.log('Error Fetching Member Information', error)
          })
  }, [])

  useEffect(() => {
    fetch('/prayer_request')
        .then((r) => r.json())
        .then((setPrayers))
        .catch((error) => {
            console.log('Error Fetching Member Information', error)
        })
  }, [])

  const handleMemberSearch = newString => setFindMember(newString.toLowerCase())


  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/home/members">
          <PeopleContainer members={members} />
        </Route>
        <Route exact path="/home/prayers">
          <PrayerContainer prayers={prayers} handleMemberSearch={handleMemberSearch} />
        </Route>
        <Route exact path="/home/new_member">
          <NewMember />
        </Route>
      </Switch>
    </>
  
  );
}


export default App;
