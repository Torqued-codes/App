import React, { useState, useEffect } from 'react';
import { Pickaxe, Zap, TrendingUp, Clock } from 'lucide-react';
import { User, Transaction } from '../types';
import { generateTransactionHash } from '../utils/crypto';

interface MiningSectionProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onAddTransaction: (transaction: Transaction) => void;
}

export const MiningSection: React.FC<MiningSectionProps> = ({
  user,
  onUpdateUser,
  onAddTransaction,
}) => {
  const [isMining, setIsMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);
  const [hashRate, setHashRate] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMining) {
      const startTime = Date.now();
      const duration = 10000 + Math.random() * 15000; // 10-25 seconds
      setEstimatedTime(Math.ceil(duration / 1000));
      
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setMiningProgress(progress);
        setHashRate(150 + Math.random() * 100);
        setEstimatedTime(Math.ceil((duration - elapsed) / 1000));

        if (progress >= 100) {
          completeMining();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMining]);

  const startMining = () => {
    setIsMining(true);
    setMiningProgress(0);
  };

  const completeMining = () => {
    const reward = 1 + Math.random() * 99; // 1-100 TQ reward
    const updatedUser = { ...user, balance: user.balance + reward };
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      from: 'mining_pool',
      to: user.walletAddress,
      amount: reward,
      type: 'mine',
      timestamp: new Date().toISOString(),
      hash: generateTransactionHash(),
    };

    onUpdateUser(updatedUser);
    onAddTransaction(transaction);
    
    setIsMining(false);
    setMiningProgress(0);
    setHashRate(0);
    setEstimatedTime(0);
  };

  const stopMining = () => {
    setIsMining(false);
    setMiningProgress(0);
    setHashRate(0);
    setEstimatedTime(0);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 via-red-600 to-pink-700 rounded-full mb-6 shadow-2xl ring-4 ring-orange-400/30 animate-pulse relative z-10">
          <Pickaxe className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-3 relative z-10">Mine Torq Tokens</h2>
        <p className="text-blue-300/80 text-lg relative z-10">Earn TQ tokens by contributing computing power to the network</p>
      </div>

      {/* Mining Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-yellow-400/30 backdrop-blur-sm hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-white font-semibold">Hash Rate</h3>
          </div>
          <p className="text-2xl font-bold text-white">{hashRate.toFixed(1)} H/s</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-green-400/30 backdrop-blur-sm hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-white font-semibold">Progress</h3>
          </div>
          <p className="text-2xl font-bold text-white">{miningProgress.toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-white font-semibold">Time Left</h3>
          </div>
          <p className="text-2xl font-bold text-white">{estimatedTime}s</p>
        </div>
      </div>

      {/* Mining Progress */}
      {isMining && (
        <div className="mb-8 relative z-10">
          <div className="bg-slate-800/60 rounded-full h-6 overflow-hidden mb-3 border border-orange-400/30 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-700 transition-all duration-300 ease-out shadow-lg animate-pulse"
              style={{ width: `${miningProgress}%` }}
            />
          </div>
          <p className="text-center text-blue-300/80 text-lg font-medium">Mining in progress... {miningProgress.toFixed(1)}%</p>
        </div>
      )}

      {/* Mining Controls */}
      <div className="text-center relative z-10">
        {!isMining ? (
          <button
            onClick={startMining}
            className="bg-gradient-to-r from-orange-500 via-red-600 to-pink-700 text-white font-bold py-5 px-10 rounded-2xl hover:from-orange-600 hover:via-red-700 hover:to-pink-800 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-110 ring-2 ring-orange-400/30 hover:ring-orange-400/50"
          >
            Start Mining
          </button>
        ) : (
          <button
            onClick={stopMining}
            className="bg-gradient-to-r from-slate-600 via-gray-700 to-slate-800 text-white font-bold py-5 px-10 rounded-2xl hover:from-slate-700 hover:via-gray-800 hover:to-slate-900 hover:shadow-2xl hover:shadow-slate-500/30 transition-all duration-300 transform hover:scale-110 ring-2 ring-slate-400/30 hover:ring-slate-400/50"
          >
            Stop Mining
          </button>
        )}
      </div>

      <div className="mt-8 text-center text-blue-300/70 text-sm relative z-10">
        <p className="text-lg font-medium">Mining rewards: 1 - 100 TQ per successful mine</p>
        <p>Estimated time: 10-25 seconds per mine</p>
      </div>
    </div>
  );
};