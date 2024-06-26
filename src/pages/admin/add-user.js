import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar-admin';
import Loading from '../../components/loading';
import { useNavigate,Link } from 'react-router-dom';
import ConfirmationModal from '../../components/confirmation-modal'; // Adjust the import path as needed

function AddUser() {
    const [loading, setLoading] = useState(true); // Initially set to true
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({
        username: '',
        name: '',
        email: '',
        daerah: '',
        role: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a delay to mimic data fetching or preparation process
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Delay for 2 seconds

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true); // Show confirmation modal
    };

    const handleConfirm = async () => {
        setShowModal(false);
        const token = window.localStorage.getItem("token");

        try {
            const response = await fetch('https://cropnesia-be.vercel.app/api/user/add-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + token,
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("✅ Berhasil menambah user!");
                setErrorMessage("");
                setUser({
                    username: '',
                    name: '',
                    email: '',
                    daerah: '',
                    role: '',
                });
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/list-user");
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "❌ Gagal Masuk");
                setTimeout(() => {
                setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("❌ Terjadi error. Coba lagi nanti");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <Navbar />
            <div style={{ marginLeft: "10%", position: "absolute" }} className="w-9/12">
                <div className="w-full mt-8 ">
                    <h1 className="ml-24 font-semibold text-[#055C5B] text-center font-[Inter, sans-serif] text-2xl">Form Tambah User</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-4 mb-4 ml-20 mt-4">
                            <div>
                                <p className="text-[#055C5B] font-medium ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Username*</p>
                                <input
                                    type="text"
                                    name="username"
                                    className='bg-[#EFF5F5] mt-2 h-9 w-[440px] rounded-3xl pl-4'
                                    value={user.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p className="text-[#055C5B] font-medium ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Nama*</p>
                                <input
                                    type="text"
                                    name="name"
                                    className='bg-[#EFF5F5] h-9 w-[440px] rounded-3xl pl-4 mt-2'
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-[#055C5B] font-medium mt-2 ml-20" style={{ fontFamily: 'Inter, sans-serif' }}>Email*</p>
                        <input
                            type="text"
                            name="email"
                            className='bg-[#EFF5F5] mt-1 h-9 w-[900px] rounded-3xl pl-4 ml-20'
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex space-x-4 mb-4 mt-4 ml-20">
                            <div>
                                <p className="text-[#055C5B] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Domisili*</p>
                                <select
                                    name="daerah"
                                    className='h-9 w-[440px] bg-[#EFF5F5] mt-2 rounded-3xl pl-4 custom-dropdown'
                                    value={user.daerah}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="None">None</option>
                                    <option value="Jakarta">Jakarta</option>
                                    <option value="Banten">Banten</option>
                                    <option value="Jawa Barat">Jawa Barat</option>
                                    <option value="Jawa Tengah">Jawa Tengah</option>
                                    <option value="Jawa Timur">Jawa Timur</option>
                                    <option value="Yogyakarta">Yogyakarta</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-[#055C5B] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Peran*</p>
                                <select
                                    name="role"
                                    className='h-9 w-[440px] bg-[#EFF5F5] mt-2 rounded-3xl pl-4 custom-dropdown'
                                    value={user.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="None">None</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Pemerintah">Pemerintah</option>
                                    <option value="Petani">Petani</option>
                                </select>
                            </div>
                        </div>
                            <button
                                type="submit"
                                className="bg-[#055C5B] font-medium text-white rounded-md hover:bg-[#2DB296] focus:outline-none w-[120px] h-9 flex items-center justify-center transition-all duration-200 active:bg-[#055C5B] ml-[540px] mt-8"
                            >
                                Add User
                            </button>
                    </form>
                    <Link to="/list-user">
                        <button
                            className="bg-[#B1E5D9] font-medium text-[#055C5B] rounded-md hover:bg-[#EFF5F5] focus:outline-none w-[120px] h-9 flex items-center justify-center transition-all duration-200 active:bg-[#B1E5D9] ml-[400px] mt-[-36px]"
                        >
                            Cancel
                        </button>
                    </Link>
                    {successMessage && (
                        <div className="absolute top-40 ml-16 left-1/2 transform -translate-x-1/2 bg-green-100 p-4 rounded-lg shadow-lg flex items-center">
                            <p className="text-green-500">{successMessage}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="absolute top-40 ml-16 left-1/2 transform -translate-x-1/2 bg-red-100 p-4 rounded-lg shadow-lg flex items-center">
                            <p className="text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                message="Apakah Anda yakin ingin membuat user?"
            />
        </React.Fragment>
    );
}

export default AddUser;