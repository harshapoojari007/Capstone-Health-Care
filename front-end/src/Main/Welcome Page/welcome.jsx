import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../Components/UIElements/Button";
import "./welcome.css"
const Welcome=()=>{
  const myStyles={
    width:"10rem",
    color:"#3795BD"
  }

  return (<div className="welcome_main">
    <div className="carousal">
      
    </div>
    <div className="text-white btn btn-primary ">
           <NavLink to={"appointmentBooking"} className="text-white text-decoration-none">Book an Appointment</NavLink>
        </div>

  </div>)
}
export default Welcome;