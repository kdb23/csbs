import React, {useState} from 'react'
import People from './People'
import {Container, Row, Form} from 'react-bootstrap'

function PeopleContainer({members}) {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = e => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm)
    }

    const filteredMembers = members.filter((memberObj) => {
        const nameString = memberObj.name ? memberObj.name.toLowerCase() : '';
        const phoneString = String(memberObj.phone).toLowerCase();
        return (
          nameString.toLowerCase().includes(searchTerm) ||
          phoneString.includes(searchTerm)
        );
      });    

    console.log('Members:', members)

    const persons = filteredMembers ? filteredMembers.map((mObj) => {
        return <People
                    key = {mObj.id}
                    id = {mObj.id}
                    firstName = {mObj.first_name}
                    lastName = {mObj.last_name}
                    address = {mObj.address}
                    phone = {mObj.phone}
                />
    }) : null

    console.log('Persons:', persons)

    return(
        <Container className="mt-5">
            <h1>Member Information Here</h1>
            <Row>
                <Form.Control
                    type='text'
                    id='search'
                    placeholder='YO PLACE THAT INFORMATION YOU LOOKIN FOR HERE'
                    onChange={handleSearch}
                />
            </Row>
            {persons}
        </Container>
    )
}

export default PeopleContainer