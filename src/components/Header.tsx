import React from 'react';
import { Coins, LogOut, User as UserIcon, Wallet, ChevronDown, Mail, Hash } from 'lucide-react';
import { User } from '../types';
import { formatAddress } from '../utils/crypto';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border-b border-blue-500/30 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg ring-2 ring-blue-400/30 overflow-hidden">
              <img 
                src="/Gemini_Generated_Image_cmknr0cmknr0cmkn copy.png" 
                alt="Torq Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Torq</h1>
              <p className="text-sm text-blue-300/80">Digital Currency Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-green-400/30 backdrop-blur-sm hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105">
              <Wallet className="w-4 h-4 text-green-400" />
              <div className="text-sm">
                <span className="text-green-300/70">Wallet:</span>
                <span className="text-white font-mono ml-1">{formatAddress(user.walletAddress)}</span>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <UserIcon className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-white">{user.username}</span>
                <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-purple-400/30 shadow-2xl z-50 overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="text-center pb-4 border-b border-purple-400/20">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-full mb-3 border border-purple-400/30">
                        <UserIcon className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{user.username}</h3>
                      <p className="text-purple-300/70 text-sm">User Profile</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/60 to-blue-900/60 rounded-xl border border-blue-400/20">
                        <UserIcon className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-blue-300/70 text-sm">Username</p>
                          <p className="text-white font-medium">{user.username}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/60 to-purple-900/60 rounded-xl border border-purple-400/20">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-purple-300/70 text-sm">Email</p>
                          <p className="text-white font-medium break-all">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/60 to-green-900/60 rounded-xl border border-green-400/20">
                        <Wallet className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-green-300/70 text-sm">Wallet Address</p>
                          <p className="text-white font-mono text-sm break-all">{user.walletAddress}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/60 to-indigo-900/60 rounded-xl border border-indigo-400/20">
                        <Hash className="w-5 h-5 text-indigo-400" />
                        <div>
                          <p className="text-indigo-300/70 text-sm">User ID</p>
                          <p className="text-white font-mono">{user.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-300 rounded-xl border border-red-400/30 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Backdrop to close dropdown */}
      {showUserDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </header>
  );
};