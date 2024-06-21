import React, { useState } from 'react';
import logo from '../images/image-removebg-preview 2.png';
import login from '../images/download 1.png';
import username from '../images/username.svg';
import password from '../images/password.svg';
import show from '../images/show.svg';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <React.Fragment>
      <img src={logo} alt="logo" className="w-16 h-auto ml-4" />
      <h1 className="text-center text-4xl font-semibold text-[#055C5B] absolute w-full font-poppins" style={{ top: '16px' }}>
        Cropnesia
      </h1>
      <div className="absolute w-full">
        <hr className="w-full border-t-2 border-[#055C5B] mt-1" />
        <div className="flex justify-center items-center mt-12">
          <img src={login} alt="login" className="w-80 h-auto" />
          <div className="bg-[#055C5B] h-[415px] w-[560px] relative">
            <div className='mt-10 ml-10 text-white absolute w-full font-poppins'>
              <h1 className="text-4xl font-bold">Selamat Datang!</h1>
              <p className="text-xl font-normal mt-2">Masuk ke Akunmu</p>
            </div>
            <div className='mt-[148px] ml-10 text-white absolute inline-flex items-center' style={{ fontFamily: 'Inter, sans-serif' }}>
              <img src={username} alt="username" />
              <p className="ml-2">Username</p>
            </div>
            <input type="text" className='mt-[178px] ml-[70px] h-9 w-[440px] rounded-3xl pl-4'></input>
            <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <img src={password} alt="password" />
              <p className='ml-2 mt-1'>Password</p>
            </div>
            <input type="password" className='mt-1 ml-[70px] h-9 w-[440px] rounded-3xl pl-4'></input>
            <button className='mt-12 ml-[70px] bg-[#75C4B5] rounded-3xl h-9 px-4 w-[440px] text-white font-semibold'>Masuk</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
