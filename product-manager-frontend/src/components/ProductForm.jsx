import React, { useState, useEffect } from 'react';
import { saveProductAPI } from '../api/api';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ProductForm({ product, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    costPrice: '',
    sellingPrice: '',
    stock: '',
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProductAPI(
        {
          ...formData,
          costPrice: parseFloat(formData.costPrice),
          sellingPrice: parseFloat(formData.sellingPrice),
          stock: parseInt(formData.stock),
        },
        product?._id
      );
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-lime-50 to-green-100 border border-green-200 rounded-2xl shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        {product ? (
          <>
            <CheckCircle className="text-green-600" size={22} />
            Edit Product
          </>
        ) : (
          <>
            <PlusCircle className="text-lime-600" size={22} />
            Add New Product
          </>
        )}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2 text-gray-700"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-green-200 rounded-lg p-3 focus:ring-2 focus:ring-lime-400 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          name="costPrice"
          placeholder="Cost Price"
          value={formData.costPrice}
          onChange={handleChange}
          required
          className="border border-green-200 rounded-lg p-3 focus:ring-2 focus:ring-lime-400 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          required
          className="border border-green-200 rounded-lg p-3 focus:ring-2 focus:ring-lime-400 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          className="border border-green-200 rounded-lg p-3 focus:ring-2 focus:ring-lime-400 focus:outline-none placeholder-gray-400"
        />

        <div className="md:col-span-2 flex gap-3 mt-3">
          <button
            type="submit"
            className="flex-1 bg-lime-500 hover:bg-lime-600 text-white py-2.5 rounded-xl font-semibold shadow-sm transition duration-200"
          >
            {product ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-2"
          >
            <XCircle size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
