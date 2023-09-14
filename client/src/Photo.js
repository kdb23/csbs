import React from 'react'

function Photo() {
    return(
        <div>
            <h1>Test Test</h1>
            <img src="/images/noimage.jpeg" alt='User Phot Not Found' className='img-fluid rounded-border' style={{width: '50%', maxHeight: '300px'}} />
        </div>
    )
}

export default Photo