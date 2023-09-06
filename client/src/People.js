import React from 'react'
import {Row, Col} from 'react-bootstrap'

function People({name, address, phone}) {
    return(
        <Row>
            <Col> Name: {name} </Col>
            <Col> Phone Number: {phone} </Col>
            <Col> Addres: {address} </Col>
        </Row>
    )
}

export default People