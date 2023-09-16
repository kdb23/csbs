import React from "react";

function Prayers({id,description}) {
    return(
        <div>
            <p>Request Type: {description}</p>
            <p>Member Responsible: {id} </p>
        </div>
    )
}

export default Prayers