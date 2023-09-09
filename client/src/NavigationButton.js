import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function NavigationButton() {

    const history = useHistory()

    const handleBack = () => {
        history.goBack()
    }

    return(
        <div>
            <Button onClick={handleBack}>
                Whoops Wrong Direction...Throw It In Reverse
            </Button>
        </div>
    )
}

export default NavigationButton