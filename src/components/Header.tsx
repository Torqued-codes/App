import React from 'react';
import { Coins, LogOut, User as UserIcon, Wallet, Copy, CheckCircle } from 'lucide-react';
import { User } from '../types';
import { formatAddress } from '../utils/crypto';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [showWalletDropdown, setShowWalletDropdown] = React.useState(false);
  const [copiedWallet, setCopiedWallet] = React.useState(false);

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(user.walletAddress);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch (err) {
      console.error('Failed to copy wallet address: ', err);
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border-b border-blue-500/30 shadow-2xl relative">
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
            <div className="relative">
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-green-400/30 backdrop-blur-sm hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-green-400" />
                <div className="text-sm">
                  <span className="text-green-300/70">Wallet:</span>
                  <span className="text-white font-mono ml-1">{formatAddress(user.walletAddress)}</span>
                </div>
              </button>

              {showWalletDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-[99998]" 
                    onClick={() => setShowWalletDropdown(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-96 bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-green-400/30 shadow-2xl z-[99999] overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full border border-green-400/30">
                          <Wallet className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">Wallet Address</h3>
                      </div>
                      
                      <div className="bg-slate-900/60 rounded-xl p-4 mb-4 border border-green-400/20">
                        <code className="text-green-300 font-mono text-sm break-all leading-relaxed">
                          {user.walletAddress}
                        </code>
                      </div>
                      
                      <button
                        onClick={copyWalletAddress}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-300 rounded-xl hover:from-green-500/30 hover:to-emerald-600/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 border border-green-400/30"
                      >
                        {copiedWallet ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Wallet Address
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm">
              <Wallet className="w-4 h-4 text-green-400" />
              <div className="text-sm">
                <span className="text-green-300/70">Wallet:</span>
                <span className="text-white font-mono ml-1">{formatAddress(user.walletAddress)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm">
              <UserIcon className="w-5 h-5 text-purple-400" />
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