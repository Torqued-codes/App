import React from 'react';
import { Coins, LogOut, User as UserIcon, Hash } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border-b border-blue-500/30 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-full shadow-lg ring-2 ring-blue-400/30">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Torq</h1>
              <p className="text-sm text-blue-300/80">Digital Currency Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-400/30 backdrop-blur-sm">
              <Hash className="w-4 h-4 text-blue-400" />
              <div className="text-sm">
                <span className="text-blue-300/70">ID:</span>
                <span className="text-white font-mono ml-1">{user.id}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium text-white">{user.username}</span>
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
    </header>
  );
};