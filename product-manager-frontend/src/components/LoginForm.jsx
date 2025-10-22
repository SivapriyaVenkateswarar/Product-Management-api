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
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Client Key"
            value={clientKey}
            onChange={(e) => setClientKey(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <div className="relative">
            <input
              type={showSecret ? 'text' : 'password'}
              placeholder="Client Secret"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-lime-500 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
