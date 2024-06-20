import React from 'react';
import logo from '../images/image-removebg-preview 2.png';

function Login() {
    return (
      <React.Fragment>
        <img src={logo} alt="logo" className="w-16 h-auto ml-4" />
        <h1 className="text-center text-4xl font-semibold text-[#055C5B] absolute w-full font-poppins" style={{ top: '16px' }}>
          Cropnesia
        </h1>
        <div className="absolute w-full">
          <hr className="w-full border-t-2 border-[#055C5B] mt-1" />
          <div className="flex justify-center mt-16">
            <div className="bg-[#055C5B] h-96 w-4/12 rounded-3xl"></div>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Login;
