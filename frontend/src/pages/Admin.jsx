import React, { useState, useEffect } from 'react';
import api from '../api';

function Admin() {
    const [sweets, setSweets] = useState([]);
    const [stats, setStats] = useState({ total_sales_today: 0, orders_today: 0, low_stock_items: 0 });
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', quantity: '', description: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetchSweets();
        await fetchStats();
        await fetchSales();
    };

    const fetchSweets = async () => {
        const res = await api.get('/sweets');
        setSweets(res.data);
    };

    const fetchStats = async () => {
        try {
            const res = await api.get('/sales/stats');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSales = async () => {
        try {
            const res = await api.get('/sales');
            setSales(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // State and Handlers
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // ... existing fetch functions ...

    // Updated Handler for Create/Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await api.put(`/sweets/${editId}`, formData);
                alert('Sweet updated successfully!');
            } else {
                await api.post('/sweets', formData);
                alert('Sweet added successfully!');
            }
            fetchSweets();
            resetForm();
        } catch (err) {
            alert('Error saving sweet: ' + (err.response?.data?.detail || 'Unauthorized'));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', category: '', price: '', quantity: '', description: '' });
        setEditMode(false);
        setEditId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            try {
                await api.delete(`/sweets/${id}`);
                alert('Sweet deleted.');
                fetchSweets();
            } catch (err) {
                alert('Error deleting sweet: ' + (err.response?.data?.detail || 'Unauthorized'));
            }
        }
    };

    const handleRestock = async (id) => {
        const qty = prompt('Enter quantity to add to stock:');
        if (qty && !isNaN(qty)) {
            try {
                await api.post(`/sweets/${id}/restock?quantity=${qty}`);
                alert('Stock updated.');
                fetchSweets();
            } catch (err) {
                alert('Error restocking: ' + (err.response?.data?.detail || 'Unauthorized'));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-blue-500 inline-block pb-2">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-lg font-bold opacity-90">Sales Today</h3>
                        <p className="text-4xl font-extrabold mt-2">₹{stats.total_sales_today}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-lg font-bold opacity-90">Orders Today</h3>
                        <p className="text-4xl font-extrabold mt-2">{stats.orders_today}</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-lg font-bold opacity-90">Low Stock Items</h3>
                        <p className="text-4xl font-extrabold mt-2">{stats.low_stock_items}</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl mb-12 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">{editMode ? '✏️' : '➕'}</span>
                        {editMode ? 'Edit Sweet' : 'Add New Sweet'}
                    </h2>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">{editMode ? '✏️' : '➕'}</span>
                        {editMode ? 'Edit Sweet' : 'Add New Sweet'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Inputs remain same */}
                        <input name="name" placeholder="Sweet Name" value={formData.name} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition" required />
                        <input name="category" placeholder="Category (e.g. Traditional)" value={formData.category} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition" required />
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">₹</span>
                            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="p-3 pl-8 w-full border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition" required />
                        </div>
                        <input name="quantity" type="number" placeholder="Initial Stock Quantity" value={formData.quantity} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition" required />
                        <textarea name="description" placeholder="Description of the sweet..." value={formData.description} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition md:col-span-2 h-24" />

                        <div className="md:col-span-2 flex gap-4">
                            <button type="submit" className={`flex-1 text-white p-4 rounded-xl font-bold shadow-lg transform hover:scale-[1.02] transition duration-200 ${editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                {editMode ? 'Update Sweet' : 'Add Sweet to Inventory'}
                            </button>
                            {editMode && (
                                <button type="button" onClick={resetForm} className="bg-gray-500 text-white p-4 rounded-xl hover:bg-gray-600 font-bold shadow-lg transform hover:scale-[1.02] transition duration-200">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inventory Table */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">📦</span>
                            Inventory
                        </h2>
                        <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6">Name</th>
                                        <th className="py-3 px-6">Price</th>
                                        <th className="py-3 px-6">Stock</th>
                                        <th className="py-3 px-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {sweets.map(sweet => (
                                        <tr key={sweet.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="py-3 px-6 whitespace-nowrap font-medium">{sweet.name}</td>
                                            <td className="py-3 px-6 text-green-600 font-bold">₹{sweet.price}</td>
                                            <td className="py-3 px-6">
                                                <span className={`py-1 px-3 rounded-full text-xs font-bold ${sweet.quantity > 10 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                    {sweet.quantity}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 flex space-x-2">
                                                <button onClick={() => handleEdit(sweet)} className="text-yellow-500 hover:text-yellow-700 font-bold">Edit</button>
                                                <button onClick={() => handleRestock(sweet.id)} className="text-blue-500 hover:text-blue-700 font-bold">Restock</button>
                                                <button onClick={() => handleDelete(sweet.id)} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sales History Table */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">💰</span>
                            Sales History
                        </h2>
                        <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-4">Bill No</th>
                                        <th className="py-3 px-4">Amount</th>
                                        <th className="py-3 px-4">Mode</th>
                                        <th className="py-3 px-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {sales.map(sale => (
                                        <tr key={sale.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-mono text-xs">{sale.bill_number}</td>
                                            <td className="py-3 px-4 font-bold">₹{sale.total_amount}</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-semibold">{sale.payment_mode}</span>
                                            </td>
                                            <td className="py-3 px-4 text-xs">{new Date(sale.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
