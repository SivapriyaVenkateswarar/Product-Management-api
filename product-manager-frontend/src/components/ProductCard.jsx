import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  const profit = product.sellingPrice - product.costPrice;

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-4 flex flex-col justify-between">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p>Cost: ${product.costPrice.toFixed(2)}</p>
      <p>Selling: ${product.sellingPrice.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <p className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>Profit: ${profit.toFixed(2)}</p>
      <div className="flex gap-2 mt-3">
        <button onClick={onEdit} className="flex-1 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1"><Edit2 size={16}/> Edit</button>
        <button onClick={onDelete} className="flex-1 bg-red-500 text-white py-1 rounded flex items-center justify-center gap-1"><Trash2 size={16}/> Delete</button>
      </div>
    </div>
  );
}
