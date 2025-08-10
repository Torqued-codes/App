import React from 'react';
import { Info, Coins, Database, Calendar, TrendingUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative overflow-hidden">
      {/* Floating Torq Tokens Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-10 right-10 w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '6s' }}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 rounded-full mb-6 shadow-2xl ring-4 ring-cyan-400/30 animate-pulse relative z-10">
          <Info className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 relative z-10">About Torq Token</h2>
        <p className="text-blue-300/80 text-lg relative z-10">Learn about the revolutionary Torq (TQ) cryptocurrency</p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Token Name */}
        <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <Coins className="w-6 h-6 text-cyan-400" />
            <h3 className="text-white font-semibold text-lg">Token Name</h3>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Torq (TQ)</p>
          <p className="text-blue-300/70 mt-2">The next-generation digital currency for the decentralized future</p>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-white font-semibold text-lg">Description</h3>
          </div>
          <p className="text-blue-200 leading-relaxed">
            Torq (TQ) is a revolutionary cryptocurrency designed for the modern digital economy. 
            Built with cutting-edge blockchain technology, TQ offers fast, secure, and low-cost transactions. 
            Our mining system rewards users for contributing computational power to maintain network security 
            and decentralization. Join the Torq ecosystem and be part of the future of digital finance.
          </p>
        </div>

        {/* Total Supply */}
        <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-purple-400/30 backdrop-blur-sm hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-6 h-6 text-purple-400" />
            <h3 className="text-white font-semibold text-lg">Total Supply</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">9,000,000 TQ</p>
          <p className="text-blue-300/70 mt-2">Fixed supply ensures scarcity and long-term value appreciation</p>
        </div>

        {/* Launch Date */}
        <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-indigo-400/30 backdrop-blur-sm hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-semibold text-lg">Network Launch</h3>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">2025</p>
          <p className="text-blue-300/70 mt-2">Pioneering the next generation of decentralized finance</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-8 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 border border-emerald-400/30 rounded-2xl p-6 backdrop-blur-sm relative z-10">
        <h4 className="text-emerald-300 font-semibold mb-3 text-lg">🚀 Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-emerald-200 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span>Proof-of-Work Mining</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            <span>Fast Transactions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Low Transaction Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span>Secure Blockchain</span>
          </div>
        </div>
      </div>
    </div>
  );
};