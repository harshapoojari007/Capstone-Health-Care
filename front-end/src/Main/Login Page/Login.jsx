import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../images/MainLogo.png";
import tablet from "../../images/tablet.png";
import plus from "../../images/plus.png"
import symbol from "../../images/symbol.png"
import sethescope from "../../images/sethescope.png"
import { useUser } from '../../UserContext';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login}=useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    try {

    const response=await axios.post('http://localhost:8089/api/v1/auth/login', { email, password});
    console.log(response.data)
    const loggedUser=response.data.user
    login(loggedUser)
      navigate('/'); // Redirect to login after successful signup
      alert("Successfully logged in");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };
  return (
    <div className='flex  items-center h-screen auth relative overflow-hidden'>
      <button onClick={() => { navigate('/') }} className='rounded-2xl px-4 py-2 bg-[#343434] text-white text-md m-4 absolute top-0 right-0'>  <i class="fa-regular fa-hand-point-left mr-2"></i>Back to home</button>



      <div className="w-full max-w-md p-6 text-white ml-[55%] ">
        <img src={logo} className='w-20 ml-[40%] mb-4' alt="" />
        <h2 className="text-center mb-4 font-bold">Login</h2>
        <p className='mt-2 text-md text-center mb-4'>Don't have an account ? <a href="/signup" className='text-blue-800 font-semibold text-lg text-decoration-none'>Sign Up</a></p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control text-white`}
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control text-white`}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className=" w-full ">Login</button>

        </form>
      </div>
      <div className='auth-divs absolute w-[350px] h-[400px]  -top-24 left-[20%] -rotate-6'>
        <div className='bg-[#FFCC00]'>
                <img src={sethescope} className='w-[400px] h-[250px] position-relative top-24 opacity-5 ' alt="" />
        </div>
      </div>
      <div className='  auth-divs absolute w-[260px] h-[500px]  -top-12 -left-[6%] -rotate-3'>
        <div className='bg-[#FF3366]'>
        <img src={symbol} className='opacity-5 w-[250px] h-[440px] rounded-[40px] position-relative left-[px] top-8' alt="" />
        </div>
      </div>
      <div className='auth-divs absolute w-[350px] h-[400px]  -bottom-[20%] left-[20%] rotate-6'>
        <div className=' bg-[#22CB88]'>
        <img src={plus} className='opacity-5 rounded-[50px]' alt="" />
        </div>
      </div>
      <div className='auth-divs absolute w-[350px] h-[400px]  -bottom-72 -left-36' >
        <div className=' bg-[#009AFE]'>
        <img src={tablet} className='opacity-5 w-[170px] h-[100px]  rounded-3xl position-relative -right-36 top-1' alt="" />
        </div>
      </div>
    </div>


  );
};

export default Login;
