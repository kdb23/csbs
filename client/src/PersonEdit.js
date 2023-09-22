import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, Container, Row, Col} from 'react-bootstrap'
import Photo from './Photo'

function PersonEdit({handleMemberDelete, members}) {

    const [memberInfo, setMemberInfo] = useState([])
    const [prayerInfo, setPrayerInfo] = useState([])
    const [error, setError] = useState(null)
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
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

    useEffect(() => {
        fetch(`/prayers/${id}`)
            .then((r) => r.json())
            .then((data) => {
                console.log('Fetched Prayer Request data:', data);
                setPrayerInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching prayer request information:', error);
            });
    }, [id]);

    const handleBack = () => {
        history.goBack()
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Member ?")) {
            try {
                const response = await fetch(`/members/${id}`, {
                    method: "DELETE"
                });
                if (response.status === 204 ) {
                    handleMemberDelete(id)
                    history.goBack()
                } else {
                    setError('ERROR: Unable to Delete Member');
                }
            } catch (error) {
                console.error(error);
                setError('An error occurred while deleting the member.');
            }
        }
    }
    

    return(
        <>
            <Container>
                <Row style={{ padding: '10px'}}>
                    <h1 className="text-center">{memberInfo.first_name}{memberInfo.last_name}</h1>
                    <div className='d-flex justify-content-end'>
                        <Button variant='secondary' onClick={handleBack}>Back</Button>
                    </div>
                </Row>
                <Col>
                    <div className='row'>
                        <Photo />
                    </div>
                </Col>
                <Col>
                    {memberInfo && (
                    <div>
                        <p>Name: {memberInfo.first_name} {memberInfo.last_name} </p>
                        <p>Address: {memberInfo.address}</p>
                        <p>Phone: {memberInfo.phone}</p>
                        <p>Family Members: {memberInfo.linked_member}</p>
                    </div>
                )}
                {prayerInfo && (
                    <div>
                        <h1>Prayer Request Container Information</h1>
                        <p>{prayerInfo.description}</p>
                    </div>
                )}
                </Col>
                <Row>
                    <Col>
                        <Button onClick={() => handleDelete(id)}>REMOVE MEMBER</Button>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PersonEdit