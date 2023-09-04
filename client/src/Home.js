import React, { useState, useEffect } from 'react';

function Home() {

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch('/members')
            .then((r) => r.json())
            .then((setMembers))
            .catch((error) => {
                console.log('Error Fetching Member Information', error)
            })
    }, [])


    return(
        <div>
            <h1>HOMEPAGE</h1>
        </div>
    )
}

export default Home