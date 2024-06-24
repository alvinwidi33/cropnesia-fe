import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar-admin';

function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchUsers = async () => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }

        console.log("Fetching users with token:", token);

        try {
    const response = await fetch(
        "https://cropnesia-be.vercel.app/api/user/get-list-user/",{
            headers: {
                Authorization : 'Token ' + window.localStorage.getItem("token")
            },
        }
    );

    if (response.ok) {
        const json_response = await response.json();
        setUsers(json_response);
    } else {
        const errorData = await response.json();
        console.error("Failed to fetch user data:", errorData);
        // Handle error state or feedback to the user
    }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};
    fetchUsers();
}, []);

    return (
        <React.Fragment>
            <Navbar />
            <div style={{ marginLeft: "12%", position: "absolute"}} className="w-9/12">
                <div className="w-full mt-8">
                    <h1 className="font-semibold text-[#055C5B] text-center font-[Inter, sans-serif] text-2xl">Daftar User</h1>
                    <table className="w-[102%] bg-white border border-[#055C5B] rounded-md overflow-hidden mt-4">
                        <thead className="bg-[#055C5B] text-white">
                            <tr>
                                <th className="py-2 px-4 text-center">Role</th>
                                <th className="py-2 px-4 text-center">Nama</th>
                                <th className="py-2 px-4 text-center">Username</th>
                                <th className="py-2 px-4 text-center">Email</th>
                                <th className="py-2 px-4 text-center">Domisili</th>
                                <th className="py-2 px-4 text-center">Tanggal Pembuatan</th>
                                <th className="py-2 px-4 text-center">Waktu Pembuatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b border-[#055C5B]">
                                    <td className="py-2 px-4 text-center">{user.role}</td>
                                    <td className="py-2 px-4 text-center">{user.name}</td>
                                    <td className="py-2 px-4 text-center">{user.username}</td>
                                    <td className="py-2 px-4 text-center">{user.email}</td>
                                    <td className="py-2 px-4 text-center">{user.daerah}</td>
                                    <td className="py-2 px-4 text-center">
                                    {new Date(user.datetime_created).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {new Date(user.datetime_created).toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ListUser;
