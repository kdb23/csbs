import React from "react";
import { Link } from 'react-router-dom'
import NavigationButton from "./NavigationButton";

function NavBar() {
    return(
        <>
            <Link to="/home">YEE HAW HERE</Link>
            <div></div>
            <Link to="/home/members">MEMBERS INFORMATION HERE</Link>
            <div></div>
            <Link to="/home/prayers">PRAYER REQUESTS</Link>
            <div></div>
            <Link to="home/new_member">UPDATE CHURCH MEMBER POPLUATION</Link>
            <div></div>
            <NavigationButton />
        </>
    )
}

export default NavBar