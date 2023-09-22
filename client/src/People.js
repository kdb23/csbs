import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function People({id, firstName, lastName, address, phone}) {
    return(
        <Row>
            <Col>
                <Link to={`/home/members/${id}`}>Name: {firstName}{lastName} </Link>
            </Col>
            <Col> Phone Number: {phone} </Col>
            <Col> Addres: {address} </Col>
        </Row>
    )
}

export default People
