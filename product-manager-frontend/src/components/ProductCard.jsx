import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  const profit = product.sellingPrice - product.costPrice;
  const profitPositive = profit >= 0;

  return (
    <div className="bg-gradient-to-br from-lime-50 to-green-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-5 flex flex-col justify-between border border-green-200">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          📦 {product.name}
        </h3>

        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-semibold">Cost:</span> ${product.costPrice.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Selling:</span> ${product.sellingPrice.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
          <p
            className={`font-semibold ${
              profitPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Profit: ${profit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition duration-200"
        >
          <Edit2 size={16} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition duration-200"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
