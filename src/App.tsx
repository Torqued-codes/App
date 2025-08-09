import React, { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { WalletCreation } from './components/WalletCreation';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './hooks/useAuth';
import { useTransactions } from './hooks/useTransactions';

type AppState = 'auth' | 'create-wallet' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const { user, isLoading, login, register, logout, updateUser } = useAuth();
  const { transactions, addTransaction } = useTransactions(user?.walletAddress || '');

  // Determine initial app state based on user and wallet
  React.useEffect(() => {
    if (user) {
      if (user.walletAddress) {
        setAppState('dashboard');
      } else {
        setAppState('create-wallet');
      }
    } else {
      setAppState('auth');
    }
  }, [user]);

  const handleWalletCreated = (walletAddress: string, privateKey: string) => {
    if (user) {
      const updatedUser = { ...user, walletAddress, privateKey };
      updateUser(updatedUser);
      setAppState('dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setAppState('auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (appState === 'auth') {
    return (
      <AuthPage
        onLogin={login}
        onRegister={register}
        onCreateWallet={() => setAppState('create-wallet')}
      />
    );
  }

  if (appState === 'create-wallet') {
    return (
      <WalletCreation
        onWalletCreated={handleWalletCreated}
        onBack={() => setAppState('auth')}
      />
    );
  }

  if (appState === 'dashboard' && user) {
    return (
      <Dashboard
        user={user}
        transactions={transactions}
        onUpdateUser={updateUser}
        onAddTransaction={addTransaction}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;