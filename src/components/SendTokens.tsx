import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { User, Transaction } from '../types';
import { generateTransactionHash, formatAddress } from '../utils/crypto';

interface SendTokensProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onAddTransaction: (transaction: Transaction) => void;
}

export const SendTokens: React.FC<SendTokensProps> = ({
  user,
  onUpdateUser,
  onAddTransaction,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    const sendAmount = parseFloat(amount);
    if (isNaN(sendAmount) || sendAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (sendAmount > user.balance) {
      setError('Insufficient balance');
      return;
    }

    if (recipient === user.walletAddress) {
      setError('Cannot send tokens to yourself');
      return;
    }

    setIsLoading(true);

    // Simulate transaction processing delay
    setTimeout(() => {
      const updatedUser = { ...user, balance: user.balance - sendAmount };
      
      const transaction: Transaction = {
        id: Date.now().toString(),
        from: user.walletAddress,
        to: recipient,
        amount: sendAmount,
        type: 'send',
        timestamp: new Date().toISOString(),
        hash: generateTransactionHash(),
      };

      onUpdateUser(updatedUser);
      onAddTransaction(transaction);
      
      setSuccess(`Successfully sent ${sendAmount} TQ to ${formatAddress(recipient)}`);
      setRecipient('');
      setAmount('');
      setIsLoading(false);

      setTimeout(() => setSuccess(''), 5000);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 rounded-full mb-6 shadow-2xl ring-4 ring-green-400/30 animate-pulse relative z-10">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 relative z-10">Send Torq Tokens</h2>
        <p className="text-blue-300/80 text-lg relative z-10">Transfer TQ tokens to another wallet address</p>
      </div>

      <form onSubmit={handleSend} className="max-w-md mx-auto space-y-6 relative z-10">
        <div>
          <label className="block text-white font-medium mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x1234567890abcdef..."
            className="w-full px-4 py-3 bg-slate-800/50 border border-green-400/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:bg-slate-800/70 transition-all duration-300"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Amount (TQ)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.0001"
            min="0"
            max={user.balance}
            className="w-full px-4 py-3 bg-slate-800/50 border border-green-400/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:bg-slate-800/70 transition-all duration-300"
            disabled={isLoading}
          />
          <p className="text-sm text-blue-300/70 mt-1">Available: {user.balance.toFixed(4)} TQ</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-300">{success}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !recipient || !amount}
          className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-200 ${
            isLoading || !recipient || !amount
              ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 text-white hover:from-green-600 hover:via-emerald-700 hover:to-teal-800 hover:shadow-2xl hover:shadow-green-500/30 transform hover:scale-110 ring-2 ring-green-400/30 hover:ring-green-400/50'
          }`}
        >
          {isLoading ? 'Processing...' : 'Send Tokens'}
        </button>
      </form>

      <div className="mt-8 text-center text-blue-300/70 text-sm relative z-10">
        <p>⚠️ Double-check the recipient address before sending</p>
        <p>Transactions are irreversible once confirmed</p>
      </div>
    </div>
  );
};