import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 1, name: 'Milk Sweets', emoji: '🥛' },
        { id: 2, name: 'Ghee Sweets', emoji: '🧈' },
        { id: 3, name: 'Dry Fruits', emoji: '🥜' },
        { id: 4, name: 'Savories', emoji: '🌶️' },
        { id: 5, name: 'Gift Boxes', emoji: '🎁' },
    ];

    const popularItems = [
        { id: 1, name: 'Kaju Katli', price: '₹800/kg', rating: '4.8', image: 'https://images.unsplash.com/photo-1596707328178-3da0c2794348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Rasgulla', price: '₹400/kg', rating: '4.5', image: 'https://images.unsplash.com/photo-1595679545464-90ff7d51eeaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'Mysore Pak', price: '₹600/kg', rating: '4.7', image: 'https://images.unsplash.com/photo-1629828453479-7a72d9396f8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Header Section */}
            <div className="bg-white rounded-b-3xl shadow-sm px-6 pt-12 pb-8 sticky top-0 z-10 text-black">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
                        <h1 className="text-2xl font-bold text-gray-800">Sweet Lover! 👋</h1>
                    </div>
                    <Link to="/login" className="bg-pink-100 p-2 rounded-full hover:bg-pink-200 transition">
                        <span className="text-2xl">👤</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative shadow-sm">
                    <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="What are you craving?"
                        className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-xl items-center focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories - Horizontal Scroll */}
            <div className="mt-6 pl-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 pr-6 scrollbar-hide">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-gray-100">
                                {cat.emoji}
                            </div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-primary">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Items - Vertical List */}
            <div className="mt-2 px-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Popular Sweets</h2>
                    <span className="text-primary text-sm font-medium cursor-pointer hover:underline">See All</span>
                </div>

                <div className="space-y-4">
                    {popularItems.map((item) => (
                        <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex space-x-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/login')}>
                            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <span className="text-yellow-400 mr-1">★</span>
                                    <span>{item.rating}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-primary">{item.price}</span>
                                    <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                        Add +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feature Banner */}
            <div className="mt-8 px-6 mb-8">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Festive Special Offer!</h3>
                        <p className="mb-4 opacity-90">Get 20% off on all gift boxes this week.</p>
                        <button onClick={() => navigate('/login')} className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-50 transition">
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Mockup (for visuals) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-8 flex justify-between items-center text-gray-400 z-50">
                <div className="flex flex-col items-center text-primary">
                    <span className="text-2xl">🏠</span>
                    <span className="text-xs font-medium">Home</span>
                </div>
                <div className="flex flex-col items-center hover:text-primary cursor-pointer" onClick={() => navigate('/login')}>
                    <span className="text-2xl">🛍️</span>
                    <span className="text-xs font-medium">Cart</span>
                </div>
                <div className="flex flex-col items-center hover:text-primary cursor-pointer" onClick={() => navigate('/login')}>
                    <span className="text-2xl">👤</span>
                    <span className="text-xs font-medium">Account</span>
                </div>
            </div>
        </div>
    );
}

export default Landing;
