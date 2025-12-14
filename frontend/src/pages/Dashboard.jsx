import React, { useEffect, useState } from 'react';
import api from '../api';
import PaymentModal from '../components/PaymentModal';

function Dashboard() {
    const [sweets, setSweets] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSweet, setSelectedSweet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (err) {
            console.error("Failed to fetch sweets", err);
        }
    };

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            try {
                const res = await api.get(`/sweets/search?q=${e.target.value}`);
                setSweets(res.data);
            } catch (err) {
                console.error("Search failed", err);
            }
        } else {
            fetchSweets();
        }
    };

    const openPaymentModal = (sweet) => {
        setSelectedSweet(sweet);
        setIsModalOpen(true);
    };

    const handlePaymentConfirm = async (paymentMode, quantity) => {
        if (!selectedSweet) return;
        try {
            await api.post(`/sweets/${selectedSweet.id}/purchase?quantity=${quantity}&payment_mode=${paymentMode}`);
            alert(`Payment Successful via ${paymentMode}! You bought ${quantity} x ${selectedSweet.name}.`);
            setIsModalOpen(false);
            setSelectedSweet(null);
            fetchSweets();
        } catch (err) {
            alert('Purchase failed: ' + (err.response?.data?.detail || 'Error'));
        }
    };

    const sweetImages = {
        "Motichoor Laddu": "/images/motichoor_laddu.png",
        "Kaju Katli": "/images/kaju_katli.png",
        "Gulab Jamun": "/images/gulab_jamun.png",
        "Mysore Pak": "/images/mysore_pak.png",
        "Rasgulla": "/images/rasgulla.png"
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-red-600 font-serif drop-shadow-sm mb-4 md:mb-0">
                        Available Sweets 🛍️
                    </h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find your favorite sweet..."
                            className="p-3 pl-10 border-2 border-pink-300 rounded-full w-80 focus:outline-none focus:border-red-500 transition shadow-sm"
                            value={search}
                            onChange={handleSearch}
                        />
                        <span className="absolute left-3 top-3 text-gray-400 text-lg">🔍</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sweets.map(sweet => (
                        <div key={sweet.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300 transform border border-pink-100">
                            <div className="h-48 bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center relative overflow-hidden group">
                                {sweetImages[sweet.name] ? (
                                    <img
                                        src={sweetImages[sweet.name]}
                                        alt={sweet.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                ) : (
                                    <span className="text-8xl filter drop-shadow hover:scale-110 transition duration-500 cursor-default">🍬</span>
                                )}
                                {sweet.quantity < 5 && sweet.quantity > 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse z-10">Low Stock</span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{sweet.name}</h3>
                                <p className="text-pink-500 text-sm font-semibold uppercase tracking-wide mb-3">{sweet.category}</p>
                                <p className="text-gray-600 mb-4 h-12 overflow-hidden text-ellipsis">{sweet.description}</p>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-2xl font-extrabold text-red-600">₹{sweet.price}</span>
                                    <span className={`text-sm font-medium ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of Stock'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => openPaymentModal(sweet)}
                                    disabled={sweet.quantity < 1}
                                    className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition duration-300 flex justify-center items-center ${sweet.quantity < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'}`}
                                >
                                    {sweet.quantity < 1 ? 'Unavailable' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handlePaymentConfirm}
                sweetName={selectedSweet?.name}
                price={selectedSweet?.price}
            />
        </div>
    );
}

export default Dashboard;
