import React, { useState } from 'react';

function PaymentModal({ isOpen, onClose, onConfirm, sweetName, price }) {
    if (!isOpen) return null;

    const [paymentMode, setPaymentMode] = useState('Card');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState({ card: '', expiry: '', cvv: '', upiId: '' });

    const handleInputChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        setError('');
    };

    const validate = () => {
        if (paymentMode === 'Card') {
            if (details.card.length < 16) return "Card number must be 16 digits";
            if (details.cvv.length < 3) return "Invalid CVV";
        }
        if (paymentMode === 'UPI') {
            if (!details.upiId.includes('@')) return "Invalid UPI ID";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        // Simulate payment gateway delay
        setTimeout(() => {
            setLoading(false);
            onConfirm(paymentMode, quantity);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 transform transition-all scale-100 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Secure Payment 🔒</h2>
                <p className="mb-4 text-gray-600">Purchasing: <span className="font-bold text-pink-600">{sweetName}</span></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg/pieces)</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-center font-bold text-lg"
                        />
                    </div>
                    <p className="mb-6 text-xl font-extrabold text-right">Total: ₹{price * quantity}</p>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50"
                        >
                            <option value="Card">Credit/Debit Card</option>
                            <option value="UPI">UPI / Wallet</option>
                            <option value="QR">Scan QR Code</option>
                            <option value="Cash">Cash on Delivery</option>
                        </select>
                    </div>

                    {paymentMode === 'Card' && (
                        <div className="space-y-3">
                            <input name="card" type="text" placeholder="Card Number" value={details.card} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required maxLength="16" />
                            <div className="flex space-x-2">
                                <input name="expiry" type="text" placeholder="MM/YY" value={details.expiry} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none" required maxLength="5" />
                                <input name="cvv" type="text" placeholder="CVV" value={details.cvv} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none" required maxLength="3" />
                            </div>
                        </div>
                    )}

                    {paymentMode === 'UPI' && (
                        <div>
                            <input name="upiId" type="text" placeholder="Enter UPI ID (e.g. user@oksbi)" value={details.upiId} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required />
                        </div>
                    )}

                    {paymentMode === 'QR' && (
                        <div className="text-center p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <div className="bg-white mx-auto mb-2 flex items-center justify-center shadow-inner p-2 w-fit rounded-lg">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=Pay ₹${price * quantity} to Anand Sweets`} alt="QR Code" className="w-32 h-32" />
                            </div>
                            <p className="text-sm font-bold text-gray-600">Scan this QR to Pay instantly!</p>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
                        <button type="submit" disabled={loading} className={`px-6 py-2 text-white rounded-lg font-bold shadow-md flex items-center ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}>
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                `Pay ₹${price * quantity}`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;
