import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-3xl font-extrabold font-serif tracking-wide hover:text-yellow-200 transition duration-300">
                        Anand Sweets 🍬
                    </Link>
                    <Link to="/" className="text-white hover:text-yellow-200 font-medium">Home</Link>
                    <Link to="/dashboard" className="text-white hover:text-yellow-200 font-medium">Shop</Link>
                </div>
                <div className="flex items-center space-x-6">
                    {user?.is_admin && (
                        <Link to="/admin" className="text-lg font-semibold hover:text-yellow-300 transition duration-200">
                            Admin Dashboard
                        </Link>
                    )}
                    {!token ? (
                        <>
                            <Link to="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-pink-600 transition duration-300">Login</Link>
                            <Link to="/register" className="px-4 py-2 bg-yellow-400 text-pink-700 rounded hover:bg-yellow-300 transition duration-300 font-bold">Register</Link>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span className="font-medium">Hello, {user?.full_name}</span>
                            <button onClick={handleLogout} className="bg-white text-pink-600 px-4 py-2 rounded shadow hover:bg-gray-100 font-bold transition duration-300">
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
