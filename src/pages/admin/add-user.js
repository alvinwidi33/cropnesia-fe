import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar-admin';
import Loading from '../../components/loading';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [loading, setLoading] = useState(true); // Initially set to true
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        const { value1, value2 } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [value1]: value2
        }));
    };

    const handleSubmit = async (e) => {
        const token = window.localStorage.getItem("token");
        e.preventDefault();
        setLoading(true);

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
                setSuccessMessage("Berhasil menambah user!");
                setErrorMessage("");
                setUser({
                    username: '',
                    name: '',
                    email: '',
                    daerah: '',
                    role: '',
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Gagal tambah User");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Terjadi Error coba lagi nanti");
            setSuccessMessage("");
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
                <div className="w-full mt-8">
                <h1 className="ml-24 font-semibold text-[#055C5B] text-center font-[Inter, sans-serif] text-2xl">Form Tambah User</h1>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="form-control bg-white"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Daerah:</label>
                        <input
                            type="text"
                            name="daerah"
                            value={user.daerah}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add User</button>
                </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddUser;
