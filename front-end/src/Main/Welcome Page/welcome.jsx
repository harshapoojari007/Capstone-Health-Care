import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../Components/UIElements/Button";
import "./welcome.css"
import Carousal from "../../Components/UIElements/Carousal";
const Welcome=()=>{
  const myStyles={
    width:"10rem",
    color:"#3795BD"
  }

  return (<div>
    <h1>hello welcome</h1>
    <ul>
      <li>
        <NavLink to={"login"}>login</NavLink>
      </li>
      <li>
        <NavLink to={"home"}>Home</NavLink>
      </li>
      <li>
        <Button value="submit" myStyles={myStyles} />
      </li>
    </ul>
    <div className="carousal">
      <Carousal/>
    </div>

  </div>)
}
export default Welcome;