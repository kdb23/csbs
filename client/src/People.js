import React from 'react'

function People({name, address, phone}) {
    return(
        <div>
            <p> Name: {name} </p>
            <p> Addres: {address} </p>
            <p> Phone Number: {phone} </p>
        </div>
    )
}

export default People