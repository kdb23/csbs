import React from 'react'
import People from './People'

function PeopleContainer({members}) {

    console.log('Members:', members)

    const persons = members ? members.map((mObj) => {
        return <People
                    key = {mObj.id}
                    name = {mObj.name}
                    address = {mObj.address}
                    phone = {mObj.phone}
                />
    }) : null

    console.log('Persons:', persons)

    return(
        <div>
            {persons}
        </div>
    )
}

export default PeopleContainer