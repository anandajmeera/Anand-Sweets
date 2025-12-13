import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password, full_name: fullName });
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-red-600">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
