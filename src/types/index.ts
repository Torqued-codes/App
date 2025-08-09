export interface User {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  privateKey: string;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: 'send' | 'receive' | 'mine';
  timestamp: string;
  hash: string;
}

export interface MiningSession {
  userId: string;
  startTime: string;
  isActive: boolean;
  hashRate: number;
}