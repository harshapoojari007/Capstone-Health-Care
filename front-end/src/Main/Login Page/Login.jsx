import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../images/MainLogo.png";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    try {
      await axios.post('http://localhost:8089/api/v1/user/login', { username, password});
      navigate('/'); 
    } catch (err) {
      setError('Failed to login in. Please try again.');
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
              id="username"
              name="username"
              pattern="[a-zA-Z0-9_]{3,15}"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

        </div>
      </div>
      <div className='  auth-divs absolute w-[250px] h-[500px]  -top-12 -left-[6%] -rotate-3'>
        <div className='bg-[#FF3366]'>

        </div>
      </div>
      <div className='auth-divs absolute w-[350px] h-[400px]  -bottom-[20%] left-[20%] rotate-6'>
        <div className=' bg-[#22CB88]'>

        </div>
      </div>
      <div className='auth-divs absolute w-[350px] h-[400px]  -bottom-72 -left-36' >
        <div className=' bg-[#009AFE]'>

        </div>
      </div>
    </div>


  );
};

export default Login;
