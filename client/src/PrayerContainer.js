import React, {useState} from "react";
import Prayers from "./Prayers";
import {Container, Row, Form} from 'react-bootstrap'

function PrayerContainer({prayers}) {

    const [searchTerm, setSearchTerm] = useState('')

    const handlePrayer = e => {
        const newPrayer = e.target.value.toLowerCase();
        setSearchTerm(newPrayer)
    }

    const filteredPrayers = prayers.filter((prayerObj) => {
        return (
            prayerObj.description.toLowerCase().includes(searchTerm)
        )
    })

    console.log("Prayers:", prayers)

    const requests = filteredPrayers ? filteredPrayers.map((pObj) => {
        return <Prayers
                    key = {pObj.id}
                    id = {pObj.id}
                    description = {pObj.description}
                />
    }) : null

    console.log('Prayers:', prayers)

    return(
        <Container className="mt-5">
            <h1>Church Member Prayer Request</h1>
            <Row>
                <Form.Control
                    type="text"
                    id="search"
                    placeholder="What Kinda Praying Ya Feel Like Doing Today ?"
                    onChange={handlePrayer}
                />
            </Row>
            {requests}
        </Container>
    )
}

export default PrayerContainer