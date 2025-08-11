import React, { useState } from 'react';
import { Wallet, Key, Copy, CheckCircle } from 'lucide-react';
import { generateWalletAddress, generatePrivateKey } from '../utils/crypto';

interface WalletCreationProps {
  onWalletCreated: (walletAddress: string, privateKey: string) => void;
  onBack: () => void;
}

export const WalletCreation: React.FC<WalletCreationProps> = ({
  onWalletCreated,
  onBack,
}) => {
  const [walletData, setWalletData] = useState<{
    address: string;
    privateKey: string;
  } | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const generateWallet = () => {
    const address = generateWalletAddress();
    const privateKey = generatePrivateKey();
    setWalletData({ address, privateKey });
  };

  const copyToClipboard = async (text: string, type: 'address' | 'key') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleContinue = () => {
    if (walletData) {
      onWalletCreated(walletData.address, walletData.privateKey);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-2xl">
        <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 rounded-full mb-6 shadow-2xl ring-4 ring-green-400/30 animate-pulse">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-2xl ring-4 ring-green-400/30 animate-pulse overflow-hidden">
            <img 
              src="/Gemini_Generated_Image_cmknr0cmknr0cmkn copy.png" 
              alt="Torq Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {!walletData ? (
            <div className="text-center">
              <button
                onClick={generateWallet}
                className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 text-white font-bold py-5 px-10 rounded-2xl hover:from-green-600 hover:via-emerald-700 hover:to-teal-800 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110 ring-2 ring-green-400/30 hover:ring-green-400/50"
              >
                Generate New Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet Address */}
              <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-green-400/30 backdrop-blur-sm hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="w-6 h-6 text-green-400" />
                  <h3 className="text-white font-semibold text-lg">Wallet Address</h3>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-4 mb-3 border border-green-400/20">
                  <code className="text-green-300 font-mono text-sm break-all">
                    {walletData.address}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(walletData.address, 'address')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 border border-green-400/30"
                >
                  {copiedAddress ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Address
                    </>
                  )}
                </button>
              </div>

              {/* Private Key */}
              <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-red-400/30 backdrop-blur-sm hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-6 h-6 text-red-400" />
                  <h3 className="text-white font-semibold text-lg">Private Key</h3>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-4 mb-3 border border-red-400/20">
                  <code className="text-red-300 font-mono text-sm break-all">
                    {walletData.privateKey}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(walletData.privateKey, 'key')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105 border border-red-400/30"
                >
                  {copiedKey ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Private Key
                    </>
                  )}
                </button>
              </div>

              {/* Warning */}
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Important Security Notice</h4>
                <ul className="text-yellow-200 text-sm space-y-1">
                  <li>• Save your private key in a secure location</li>
                  <li>• Never share your private key with anyone</li>
                  <li>• You cannot recover your wallet without the private key</li>
                  <li>• Torq team will never ask for your private key</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onBack}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-slate-600/20 to-gray-700/20 text-slate-300 rounded-xl hover:from-slate-600/30 hover:to-gray-700/30 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 transform hover:scale-105 border border-slate-400/30"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white font-bold rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 ring-2 ring-blue-400/30 hover:ring-blue-400/50"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};