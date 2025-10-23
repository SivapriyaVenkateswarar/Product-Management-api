import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginAPI } from '../api/api';

export default function LoginForm({ onLogin }) {
  const [clientKey, setClientKey] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await loginAPI(clientKey, clientSecret);
      setError('');
      onLogin(clientKey, clientSecret);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-lime-100 to-green-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full opacity-10"></div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Left panel — illustration area */}
        <div className="lg:w-1/2 bg-gradient-to-b from-lime-100 to-green-100 p-8 lg:p-12 flex flex-col items-center justify-center relative">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-center text-green-700 font-semibold text-lg">Manage Your Products</p>
          <p className="text-center text-green-600 text-sm mt-2">Secure, fast, and easy to use</p>

          {/* Floating emojis */}
          <div className="absolute top-4 right-6 text-3xl opacity-60">🌱</div>
          <div className="absolute bottom-8 left-4 text-2xl opacity-50">🪴</div>
        </div>

        {/* Right panel — login form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-500"></div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Manager</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Sign in</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client Key</label>
              <input
                type="text"
                placeholder="Enter your client key"
                value={clientKey}
                onChange={(e) => setClientKey(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-lime-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client Secret</label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  placeholder="Enter your client secret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-lime-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 active:scale-95 mt-6 shadow-lg"
            >
              Sign in
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Keep your credentials safe and secure
          </p>
        </div>
      </div>
    </div>
  );
}
