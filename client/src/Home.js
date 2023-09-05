import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PeopleContainer from './PeopleContainer';
import NavBar from './NavBar';

function Home() {

    // const [members, setMembers] = useState([])

    // useEffect(() => {
    //     fetch('/members')
    //         .then((r) => r.json())
    //         .then((setMembers))
    //         .catch((error) => {
    //             console.log('Error Fetching Member Information', error)
    //         })
    // }, [])


    return(
        <div>
            <Link to ="/home/members">MEMBER INFORMATION</Link>
        </div>
    )
}

export default Home