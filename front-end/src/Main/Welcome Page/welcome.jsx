import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


import "./welcome.css"
import div2img from "../../Components/Images/welcome3.jpg"
import div2img2 from "../../Components/Images/welcome2.avif"

const Welcome = () => {
  const myStyles = {
    width: "10rem",
    color: "#3795BD"
  }

  return (<div className="welcome_main">
    <div className="welcome_navbar">
      <h1>Health-Care Appointment</h1>
      <div>
        <Button href="/login">Login</Button>
        <Button>Know Us</Button>
      </div>
    </div>
    <div className="welcome_one">
      <h1>Get Your Appointment, with just few steps</h1>
      <p>With the help of our service, you can book your appointments within no time and effortlessly!</p>
      <div className="welcome_signup_btn">
        <Button href="/signup" className="welcome_signupBtn">Signup for free</Button>
        <h3 className="welcome_sub_p">lets get started{" -->"}</h3>
      </div>
    </div>
    <div className="welcome_two">
      <img src={div2img2} alt="" className="welcome_first_img" />
      <img src={div2img} alt="" className="welcome_second_img" />
    </div>
    <div className="welcome_three">
      <h2>We provide a seamless platform for booking medical appointments and managing diagnostic services. Customers can easily <span className="welcome_span_1"> schedule and track appointments </span>at their chosen diagnostic centers, while diagnostic centers can <span className="welcome_span_2">register to manage appointments, conduct tests, and handle reports.</span> </h2>
    </div>
    <div className="welcome_four">

    </div>
    

  </div>)
}
export default Welcome;