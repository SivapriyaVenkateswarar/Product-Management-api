import React from 'react';
import { LogOut } from 'lucide-react';
import { clearJWT } from '../api/api';

export default function Header({ onLogout }) {
  const handleLogout = () => {
    clearJWT();4
    onLogout();
  };

  return (
    <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Product Manager</h1>
      <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg">
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  );
}
