import React, { useState, useEffect } from 'react';
import logo from '../images/image-removebg-preview 2.png';
import { useNavigate,Link } from 'react-router-dom';

function Navbar() {
    const [activeUser, setActiveUser] = useState({});
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `https://cropnesia-be.vercel.app/api/user/get-user-by-token/${token}/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const json_response = await response.json();
                    setActiveUser(json_response);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (token) {
            getUser();
        }
    }, [token]);

    const handleLogout = () => {
        setSuccessMessage("✅ Berhasil Logout");
        window.localStorage.removeItem("token");
        setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
        }, 2000);
    };

    return (
        <React.Fragment>
            <div className="relative flex items-center justify-between">
                <img src={logo} alt="logo" className="w-16 h-auto ml-10" />
                <h1 className="text-center text-4xl font-semibold text-[#055C5B] absolute w-full font-[Inter, sans-serif]" style={{ top: '16px' }}>
                    Cropnesia
                </h1>
                <button
                    className="absolute top-5 right-16 bg-[#055C5B] text-white rounded-md hover:bg-[#2DB296] focus:outline-none w-[88px] h-9 flex items-center justify-center transition-all duration-200 active:bg-[#055C5B]"
                    onClick={handleLogout}>
                    Logout
                </button>
                <p className="absolute top-1 right-44 mt-2 text-xl font-medium text-[#055C5B] font-[Inter, sans-serif]">{activeUser.user?.username}</p>
                <p className="absolute top-7 right-44 mt-3 font-normal text-[#055C5B] font-[Inter, sans-serif]" style={{fontSize:"14px"}}>{activeUser.user?.role} - {activeUser.user?.daerah}</p>
            </div>
            <div className="absolute w-full mt-1">
                <hr className="w-full border-t-2 border-[#055C5B]" />
            </div>
             {successMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EFF5F5] p-4 rounded-lg shadow-lg flex items-center">
                <p className="text-green-500">{successMessage}</p>
              </div>
            )}
        </React.Fragment>
    );
}

export default Navbar;
