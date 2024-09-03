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

const submitStyle={
  background:"#009FBD",
  color:"white",
  width:"10rem",
}
  return (
    <div className="mainContainer">  
      <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard>
          <MDBCardBody className='px-4'>

            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

            <MDBRow>

              <MDBCol md='6'>
                <label>First Name</label>
                <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='text'/>
              </MDBCol>

              <MDBCol md='6'>
                <label>Last Name</label>
                <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='text'/>
              </MDBCol>

            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <label>Age</label>
                <MDBInput wrapperClass='mb-4'  size='lg' id='form3' type='text'/>
              </MDBCol>

              <MDBCol md='6' className='mb-4'>
                <h6 className="fw-bold">Gender: </h6>
                <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Female' inline />
                <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Male' inline />
                <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Other' inline />
              </MDBCol>

            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <label>Email</label>
                <MDBInput wrapperClass='mb-4'  size='lg' id='form4' type='email'/>
              </MDBCol>

              <MDBCol md='6'>
                <label>Phone Number</label>
                <MDBInput wrapperClass='mb-4' size='lg' id='form5' type='rel'/>
              </MDBCol>

            </MDBRow>

            <Button myStyles={{...submitStyle}} value="Submit" />
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Already Registered?</p>
                            <NavLink to={"/login"} >
                            <Button myStyles={{...style}} value="Login" />
                            </NavLink>
                        </div>
          </MDBCardBody>
        </MDBCard>

      </MDBRow>
    </MDBContainer>
    </div>

  );
}

export default SignUp;