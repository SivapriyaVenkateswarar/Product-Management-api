import React from 'react';
import { LogOut } from 'lucide-react';
import { clearJWT } from '../api/api';

export default function Header({ onLogout }) {
  const handleLogout = () => {
    clearJWT();
    onLogout();
  };

  return (
    <header className="bg-gradient-to-r from-lime-400 to-green-500 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2">
          🌱 Product Manager
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-medium backdrop-blur-sm transition duration-200 ease-in-out"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
