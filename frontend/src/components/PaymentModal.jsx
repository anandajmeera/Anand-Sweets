import React, { useState } from 'react';

function PaymentModal({ isOpen, onClose, onConfirm, sweetName, price }) {
    if (!isOpen) return null;

    const [paymentMode, setPaymentMode] = useState('Card');
    const [quantity, setQuantity] = useState(1);
    const [details, setDetails] = useState({ card: '', expiry: '', cvv: '', upiId: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(paymentMode, quantity);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 transform transition-all scale-100">
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
                            <option value="Cash">Cash on Delivery</option>
                        </select>
                    </div>

                    {paymentMode === 'Card' && (
                        <div className="space-y-3">
                            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required maxLength="19" />
                            <div className="flex space-x-2">
                                <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded-lg outline-none" required maxLength="5" />
                                <input type="text" placeholder="CVV" className="w-full p-2 border rounded-lg outline-none" required maxLength="3" />
                            </div>
                        </div>
                    )}

                    {paymentMode === 'UPI' && (
                        <div>
                            <input type="text" placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required />
                        </div>
                    )}

                    {paymentMode === 'Cash' && (
                        <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                            Please pay cash at the counter upon delivery.
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 shadow-md">Pay ₹{price * quantity}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;
