import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [contact, setContact] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Recovery 🔐</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Enter your details to reset your password.</p>

                {submitted ? (
                    <div className="text-center">
                        <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
                            <p className="font-bold">Reset Link Sent! 📨</p>
                            <p className="text-sm mt-1">Check your email/SMS for the link.</p>
                        </div>
                        <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2 text-sm">Email or Phone Number</label>
                            <input
                                type="text"
                                placeholder="e.g. anand@example.com"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition bg-gray-50"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold shadow-lg transform hover:scale-[1.02] transition duration-200 hover:bg-blue-700">
                            Send Reset Link
                        </button>
                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-gray-500 hover:text-gray-700 text-sm font-semibold">Cancel and go back</Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
