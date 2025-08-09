import React, { useState, useEffect } from 'react';
import { User, Transaction } from '../types';
import { MiningSection } from './MiningSection';
import { SendTokens } from './SendTokens';
import { TransactionHistory } from './TransactionHistory';
import { Header } from './Header';
import { formatTQAmount } from '../utils/crypto';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onUpdateUser: (user: User) => void;
  onAddTransaction: (transaction: Transaction) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  transactions,
  onUpdateUser,
  onAddTransaction,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'mine' | 'send' | 'history'>('mine');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-10 border border-blue-400/30 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-4 relative z-10">Total Balance</h2>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-6 relative z-10 animate-pulse">
              {formatTQAmount(user.balance)}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-400/30 backdrop-blur-sm relative z-10">
              <span className="text-blue-300/70">Wallet:</span>
              <span className="text-white font-mono">{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-xl rounded-2xl p-2 border border-blue-400/30 shadow-xl">
            <button
              onClick={() => setActiveTab('mine')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'mine'
                  ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white shadow-lg transform scale-105'
                  : 'text-blue-300/80 hover:text-white hover:bg-blue-500/20 hover:scale-105'
              }`}
            >
              Mine Tokens
            </button>
            <button
              onClick={() => setActiveTab('send')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'send'
                  ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white shadow-lg transform scale-105'
                  : 'text-blue-300/80 hover:text-white hover:bg-blue-500/20 hover:scale-105'
              }`}
            >
              Send Tokens
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white shadow-lg transform scale-105'
                  : 'text-blue-300/80 hover:text-white hover:bg-blue-500/20 hover:scale-105'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'mine' && (
            <MiningSection
              user={user}
              onUpdateUser={onUpdateUser}
              onAddTransaction={onAddTransaction}
            />
          )}
          
          {activeTab === 'send' && (
            <SendTokens
              user={user}
              onUpdateUser={onUpdateUser}
              onAddTransaction={onAddTransaction}
            />
          )}
          
          {activeTab === 'history' && (
            <TransactionHistory
              transactions={transactions}
              userWalletAddress={user.walletAddress}
            />
          )}
        </div>
      </div>
    </div>
  );
};