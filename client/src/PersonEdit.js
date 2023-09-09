import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, Container, Row} from 'react-bootstrap'

function PersonEdit() {

    const [memberInfo, setMemberInfo] = useState([])
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`/members/${id}`)
            .then((r) => r.json())
            .then(setMemberInfo)
    },[id])

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
            </Container>
        </>
    )
}

export default PersonEdit