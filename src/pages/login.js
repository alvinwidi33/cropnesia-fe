import React, { useState } from 'react';
import logo from '../images/image-removebg-preview 2.png';
import login from '../images/download 1.png';
import usernameIcon from '../images/username.svg';
import passwordIcon from '../images/password.svg';
import showIcon from '../images/show.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch('https://cropnesia-be.vercel.app/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("daerah", data.user.daerah);
        window.localStorage.setItem("role", data.user.role);
        setSuccessMessage("Berhasil Masuk!");

        setTimeout(() => {
          setSuccessMessage("");
          if (data.user.role === 'Pemerintah') {
            navigate("/list-pertanian");
          } else if (data.user.role === 'Admin') {
            navigate("/list-user");
          } else if (data.user.role === 'Petani') {
            navigate("/list-hasil-pertanian");
          }
        }, 5000);
      } else {
        setErrorMessage(data.message || "Gagal Masuk");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      setErrorMessage("Terjadi error. Coba lagi nanti");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      <img src={logo} alt="logo" className="w-16 h-auto ml-4" />
      <h1 className="text-center text-4xl font-semibold text-[#055C5B] absolute w-full font-[Inter, sans-serif]" style={{ top: '16px' }}>
        Cropnesia
      </h1>
      <div className="absolute w-[100%]">
        <hr className="w-full border-t-2 border-[#055C5B] mt-1" />
        <div className="flex justify-center items-center mt-12">
          <img src={login} alt="login" className="w-80 h-auto rounded-bl-lg rounded-tl-lg" />
          <div className="bg-[#055C5B] h-[415px] w-[560px] relative rounded-tr-lg rounded-br-lg">
            <form onSubmit={handleLogin} className="relative">
              <div className='mt-10 ml-10 text-white absolute w-full font-poppins'>
                <h1 className="text-4xl font-bold">Selamat Datang!</h1>
                <p className="text-xl font-normal mt-2">Masuk ke Akunmu</p>
              </div>
              <div className='mt-[148px] ml-10 text-white absolute inline-flex items-center' style={{ fontFamily: 'Inter, sans-serif' }}>
                <img src={usernameIcon} alt="username" />
                <p className="ml-2">Username</p>
              </div>
              <input
                type="text"
                className='mt-[178px] ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                <img src={passwordIcon} alt="password" />
                <p className='ml-2 mt-1'>Password</p>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className='mt-1 ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-[70px] mt-[10px] '>
                <img src={showIcon} alt="show" />
              </button>
              <button type="submit" className="mt-12 ml-[70px] bg-[#75C4B5] rounded-3xl h-9 px-4 w-[440px] text-white font-semibold hover:bg-[#2DB296] focus:outline-none active:bg-[#055C5B] transition-colors duration-300">
                Masuk
            </button>
            </form>
            {successMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EFF5F5] p-4 rounded-lg shadow-lg flex items-center">
                <p className="text-green-500">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EFF5F5] p-4 rounded-lg shadow-lg flex items-center">
                <p className="text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;