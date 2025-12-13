import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);
            const response = await api.post('/auth/token', params);
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-red-600">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
