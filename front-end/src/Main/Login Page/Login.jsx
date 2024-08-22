import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';
import "./login.css"
import { NavLink } from 'react-router-dom';
import Button from '../../Components/UIElements/Button';

const Login = () => {
    const style = {
        color: "white",
        width: "5rem",
        background: "#224AA4"
    }
    return (
        <MDBContainer className="my-5 gradient-form">

            <MDBRow>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 class="mb-4">We are more than just a company</h4>
                            <p class="small mb-0">Our healthcare appointment service streamlines your path to quality care by connecting you with top-rated healthcare centers in your area. We handle the research and coordination, ensuring you find a provider that meets your needs and preferences. From scheduling consultations to managing follow-ups, our dedicated team simplifies the entire process for you. Trust us to make accessing the right healthcare convenient and stress-free.
                            </p>
                        </div>

                    </div>

                </MDBCol>

                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">

                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                style={{ width: '180px' }} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">Health Care Appointment</h4>
                        </div>

                        <p className="login_heading" >Login to your account</p>


                        <MDBInput wrapperClass='mb-4 titles' label='Email address' id='form1' type='email' />
                        <MDBInput wrapperClass='mb-4 titles' label='Password' id='form2' type='password' />


                        <div className="text-center pt-1 mb-5 pb-1">
                            <MDBBtn className="mb-4 w-100 gradient-custom-2">Login </MDBBtn>
                            <a className="text-muted" href="#!">Forgot password?</a>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <NavLink to={"/signup"} >
                                <Button value="SignUp" myStyles={{ ...style }} />
                            </NavLink>
                        </div>

                    </div>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Login;