import React, {useState} from 'react'
import People from './People'

function PeopleContainer({members}) {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = e => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm)
    }

    const filteredMembers = members.filter(memberObj => {
        return memberObj.name.toLowerCase().includes(searchTerm)
    })

    console.log('Members:', members)

    const persons = filteredMembers ? filteredMembers.map((mObj) => {
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
            <h1>Member Information Here</h1>
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