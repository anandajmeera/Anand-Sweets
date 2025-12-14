import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="min-h-screen bg-pink-50 flex flex-col">
            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 opacity-90 skew-y-3 transform -translate-y-12"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-md animate-fade-in-down font-serif">
                        Anand Sweets
                    </h1>
                    <p className="text-xl md:text-3xl text-pink-100 mb-10 font-light">
                        Experience the authentic taste of tradition. <br /> From our kitchen to your heart. 🍬
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/dashboard"
                            className="px-10 py-4 bg-yellow-400 text-red-700 text-lg font-bold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105 inline-block"
                        >
                            Order Now
                        </Link>
                        <Link
                            to="/login"
                            className="px-10 py-4 bg-white text-pink-600 text-lg font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 inline-block"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-6xl mb-4">🍯</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Pure Ingredients</h3>
                        <p className="text-gray-600">Made with 100% pure ghee and organic ingredients.</p>
                    </div>
                    <div>
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                        <p className="text-gray-600">Fresh sweets delivered to your doorstep in minutes.</p>
                    </div>
                    <div>
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Made with Love</h3>
                        <p className="text-gray-600">Traditional recipes passed down through generations.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 text-center">
                <p>&copy; 2025 Anand Sweets. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;
