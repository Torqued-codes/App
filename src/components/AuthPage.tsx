import React, { useState } from 'react';
import { Coins, Wallet, User, Mail, Lock, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => boolean;
  onRegister: (username: string, email: string, password: string) => boolean;
  onCreateWallet: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister, onCreateWallet }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = onLogin(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      const success = onRegister(formData.username, formData.email, formData.password);
      if (!success) {
        setError('User with this email already exists');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-full mb-6 shadow-2xl ring-4 ring-blue-400/30 animate-pulse">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3">Torq</h1>
          <p className="text-blue-300/80 text-lg">Your Premium Digital Currency Platform</p>
        </div>

        {/* Auth Form */}
        <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative z-10">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-slate-800/70 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-slate-800/70 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-slate-800/70 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-300/80 hover:text-white hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-400/30">
            <button
              onClick={onCreateWallet}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Create New Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};