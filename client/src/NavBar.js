import React from "react";
import { Link } from 'react-router-dom'

function NavBar() {
    return(
        <>
            <Link to="/home">YEE HAW HERE</Link>
            <div></div>
            <Link to="/home/members">MEMBERS INFORMATION HERE</Link>
            <div></div>
            <Link to="/home/prayers">PRAYER REQUESTS</Link>
        </>
    )
}

export default NavBar