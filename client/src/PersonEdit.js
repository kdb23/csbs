import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, Container, Row, Col} from 'react-bootstrap'

function PersonEdit() {

    const [memberInfo, setMemberInfo] = useState([])
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        console.log('Fetching member with ID:', id); // Log the ID
        fetch(`/members/${id}`)
            .then((r) => r.json())
            .then((data) => {
                console.log('Fetched member data:', data);
                setMemberInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching member information:', error);
            });
    }, [id]);

    const handleBack = () => {
        history.goBack()
    }

    return(
        <>
            <Container>
                <Row style={{ padding: '10px'}}>
                    <h1 className="text-center">{memberInfo.name}</h1>
                    <div className='d-flex justify-content-end'>
                        <Button variant='secondary' onClick={handleBack}>Back</Button>
                    </div>
                </Row>
                <Col>
                    <div className='row'>
                        <h1>Photo Here</h1>
                    </div>
                </Col>
                <Col>
                    {memberInfo && (
                        <div>
                            <p>Name: {memberInfo.name}</p>
                            <p>Address: {memberInfo.address}</p>
                            <p>Phone: {memberInfo.phone}</p>
                            <p>Family Members: {memberInfo.linked_member}</p>
                        </div>
                    )}
                </Col>
                <Row>
                    <Col>
                        <h1>Prayer Request Container Information</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PersonEdit