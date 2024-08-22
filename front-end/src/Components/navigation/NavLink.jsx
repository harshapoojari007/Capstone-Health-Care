import React from "react";

import { NavLink } from "react-router-dom";
import "./NavLink.css"

const NavLinks =props=>{
return <ul className="nav-links">
<li>
    <NavLink to="/" exact>Welcome Page</NavLink>
</li>
<li>
    <NavLink to="/home" exact>Home</NavLink>
</li>
<li>
    <NavLink to="/AboutUs">About Us</NavLink>
</li>
<li>
    <NavLink to="/contact">Contact Us</NavLink>
</li>
<li>
    <NavLink to="/donate">Service</NavLink>
</li>

</ul>
}

export default NavLinks;