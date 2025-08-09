import React from 'react';
import { History, ArrowUpRight, ArrowDownLeft, Pickaxe, Clock } from 'lucide-react';
import { Transaction } from '../types';
import { formatAddress, formatTQAmount } from '../utils/crypto';

interface TransactionHistoryProps {
  transactions: Transaction[];
  userWalletAddress: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  userWalletAddress,
}) => {
  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === 'mine') {
      return <Pickaxe className="w-5 h-5 text-orange-400" />;
    }
    
    const isReceived = transaction.to === userWalletAddress;
    return isReceived ? (
      <ArrowDownLeft className="w-5 h-5 text-green-400" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-red-400" />
    );
  };

  const getTransactionType = (transaction: Transaction) => {
    if (transaction.type === 'mine') return 'Mining Reward';
    return transaction.to === userWalletAddress ? 'Received' : 'Sent';
  };

  const getTransactionColor = (transaction: Transaction) => {
    if (transaction.type === 'mine') return 'text-orange-400';
    return transaction.to === userWalletAddress ? 'text-green-400' : 'text-red-400';
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5"></div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 rounded-full mb-6 shadow-2xl ring-4 ring-purple-400/30 animate-pulse relative z-10">
          <History className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent mb-3 relative z-10">Transaction History</h2>
        <p className="text-blue-300/80 text-lg relative z-10">View all your Torq token transactions</p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 relative z-10">
          <Clock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-300/80 mb-2">No Transactions Yet</h3>
          <p className="text-blue-300/60">Start mining or receive tokens to see your transaction history</p>
        </div>
      ) : (
        <div className="space-y-4 relative z-10">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full border border-blue-400/30">
                    {getTransactionIcon(transaction)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{getTransactionType(transaction)}</h4>
                    <div className="text-sm text-blue-300/70">
                      {transaction.type === 'mine' ? (
                        <span>Mining Pool → You</span>
                      ) : transaction.to === userWalletAddress ? (
                        <span>From: {formatAddress(transaction.from)}</span>
                      ) : (
                        <span>To: {formatAddress(transaction.to)}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-lg font-bold ${getTransactionColor(transaction)}`}>
                    {transaction.to === userWalletAddress || transaction.type === 'mine' ? '+' : '-'}
                    {formatTQAmount(transaction.amount)}
                  </div>
                  <div className="text-sm text-blue-300/70">{formatDate(transaction.timestamp)}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-400/20">
                <div className="text-xs text-blue-300/50">
                  <span className="font-mono">Hash: {transaction.hash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};