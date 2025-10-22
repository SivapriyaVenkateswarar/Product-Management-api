import React, { useState, useEffect } from 'react';
import { saveProductAPI } from '../api/api';

export default function ProductForm({ product, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    costPrice: '',
    sellingPrice: '',
    stock: ''
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProductAPI({
        ...formData,
        costPrice: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        stock: parseInt(formData.stock)
      }, product?._id);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="costPrice" placeholder="Cost Price" value={formData.costPrice} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="sellingPrice" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="border p-2 rounded"/>
        <div className="md:col-span-2 flex gap-2 mt-2">
          <button type="submit" className="flex-1 bg-lime-500 text-white py-2 rounded-lg">{product ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}
