<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../images/MainLogo.png";

// Validation functions
const validateUsername = (username) => /^[a-zA-Z0-9_]{3,15}$/.test(username);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // At least 8 characters, one letter and one number

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    setFormErrors({}); // Clear previous errors

    // Validate fields
    if (!validateUsername(username)) errors.username = 'Invalid username. Must be 3-15 alphanumeric characters or underscores.';
    if (!validateEmail(email)) errors.email = 'Invalid email address.';
    if (!validatePassword(password)) errors.password = 'Password must be at least 8 characters long, including at least one letter and one number.';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.post('http://localhost:8088/auth/signup', { username, password, email });
      navigate('/login'); // Redirect to login after successful signup
      alert("Successfully Registered");
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };
=======
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio
}
from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";

// import axios from 'axios';

import "./signup.css"
import Button from '../../Components/UIElements/Button';

const SignUp=()=> {
  
  const style={
    color: "white",
    width:"5rem",
    background:"#224AA4"
}
>>>>>>> 27dfb12a60eb88582ecc9ae5c3779c2645c330b8

  return (
    <div className='flex  items-center h-screen auth'>
      <button onClick={() => { navigate('/') }} className='rounded-2xl px-4 py-2 bg-[#343434] text-white text-lg m-2 absolute top-0'>  <i class="fa-regular fa-hand-point-left mr-2"></i>Back to home</button>



      <div className="w-full max-w-lg p-6 text-white ml-[10%] ">
        <img src={logo} className='w-24 ml-[38%] mb-4' alt="" />
        <h2 className="text-center mb-4 font-bold">Create Account</h2>
        <p className='mt-2 text-lg text-center mb-4'>Already a user? <a href="/login" className='text-blue-800 font-semibold'>Login</a></p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${formErrors.username ? 'border-red-500' : ''} text-white`}
              id="username"
              name="username"
              pattern="[a-zA-Z0-9_]{3,15}"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${formErrors.email ? 'border-red-500' : ''} text-white`}
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${formErrors.password ? 'border-red-500' : ''} text-white`}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <div className="mb-3">

            <input
              type="password"
              className={`form-control ${formErrors.confirmPassword ? 'border-red-500' : ''} text-white`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
          </div>
          <button type="submit" className="bg-orange-500 w-full ">Sign up</button>

        </form>
      </div>
      <div className='auth-divs'>
        <div className='bg-[#FFCC00]'>
Harsha
        </div>
      </div>
      <div className='auth-divs'>
        <div className='bg-[#FF3366]'>
                          Harsha
        </div>
      </div>
      <div className='auth-divs'>
        <div className=' bg-[#22CB88]'>
Harsha
        </div>
      </div>
    </div>

  );
};

export default Signup;
