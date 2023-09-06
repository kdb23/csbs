import React, {useState} from 'react'
import People from './People'

function PeopleContainer({members}) {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = e => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm)
    }

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
        <div className="main">
            <h1>Search Bar Practice</h1>
                <div className="search">
            <input
                type='text'
                id='search'
                placheholder=' YO PLACE THAT INFORMATION YOU LOOKIN FOR HERE'
                onChange={handleSearch}
            />
                </div>
            {persons}
        </div>
    )
}

export default PeopleContainer