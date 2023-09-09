import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

function NewMember() {

    const [addName, setAddName] = useState('')
    const [addAddress, setAddAddress] = useState('')
    const [addPhone, setAddPhone] = useState('')
    const [error, setError] = useState('')

    const handleName = e => setAddName(e.target.value)
    const handleAddress = e => setAddAddress(e.target.value)
    const handleAddPhone = e => setAddPhone(e.target.value)

    const memberObj = {
        name : addName,
        address : addAddress,
        phone : addPhone
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!addName || ! addPhone) {
            setError('Member must have Name & Phone Number')
        } else {
        fetch('/members', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(memberObj)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to add Member')
            }
                return response.json()
            })
        // .then(newMember => {
        //     addMember(newMember)
        //     alert('New Member has been added')
        }
        }
    

    return(
        <div>
            <h1>New Church Member Information Here</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Member Name:</Form.Label>
                    <Form.Control
                        type = "text"
                        name = "name"
                        placeholder = "Member Name"
                        onChnage={handleName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Member Home Address:</Form.Label>
                    <Form.Control
                        type = "text"
                        name = "address" 
                        placeholder = "Member Home Address"
                        onChange={handleAddress}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Member Phone Number</Form.Label>
                    <Form.Control
                        type = "text"
                        name = "phone"
                        placeholder = "Member Phone Number"
                        onChange={handleAddPhone}
                    />
                </Form.Group>
                <Button onClick={handleSubmit}>Add New Neighbor</Button>
            </Form>
        </div>
    )
}

export default NewMember