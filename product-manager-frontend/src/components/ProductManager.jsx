import React, { useState, useEffect } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import ProductForm from './ProductForm';
import ProductCard from './ProductCard';
import { fetchProductsAPI, deleteProductAPI } from '../api/api';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsAPI();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await deleteProductAPI(id);
        loadProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (authenticated) loadProducts();
  }, [authenticated]);

  if (!authenticated) return <LoginForm onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={() => setAuthenticated(false)} />

      <div className="max-w-7xl mx-auto p-6">
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="mb-6 bg-lime-500 text-white px-4 py-2 rounded-lg">Add Product</button>
        )}

        {showForm && (
          <ProductForm
            product={editingProduct}
            onCancel={() => { setEditingProduct(null); setShowForm(false); }}
            onSuccess={() => { setShowForm(false); setEditingProduct(null); loadProducts(); }}
          />
        )}

        {!showForm && (
          <button onClick={loadProducts} disabled={loading} className="mb-6 bg-gray-200 px-4 py-2 rounded-lg">{loading ? 'Loading...' : 'Refresh'}</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p._id} product={p} onEdit={() => handleEdit(p)} onDelete={() => handleDelete(p._id)} />
          ))}
        </div>

        {products.length === 0 && !loading && <p className="text-center mt-10 text-gray-500">No products yet</p>}
      </div>
    </div>
  );
}
