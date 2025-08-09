import { useState, useEffect } from 'react';
import { Transaction } from '../types';

export const useTransactions = (userWalletAddress: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (userWalletAddress) {
      const allTransactions = JSON.parse(localStorage.getItem('torq_transactions') || '[]');
      const userTransactions = allTransactions.filter((tx: Transaction) => 
        tx.from === userWalletAddress || tx.to === userWalletAddress
      );
      setTransactions(userTransactions.reverse());
    }
  }, [userWalletAddress]);

  const addTransaction = (transaction: Transaction) => {
    const allTransactions = JSON.parse(localStorage.getItem('torq_transactions') || '[]');
    allTransactions.push(transaction);
    localStorage.setItem('torq_transactions', JSON.stringify(allTransactions));
    
    if (transaction.from === userWalletAddress || transaction.to === userWalletAddress) {
      setTransactions(prev => [transaction, ...prev]);
    }
  };

  return { transactions, addTransaction };
};