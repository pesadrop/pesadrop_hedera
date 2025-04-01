import React, { useState } from 'react';
import { Wallet, TrendingUp, Users, ArrowDownToLine, ArrowUpFromLine, ChevronDown, Shield, History, Leaf, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('invest');

  // Mock data - would be replaced with real Hedera account data
  const accountData = {
    id: '0.0.5759082',
    balance: '100',
    transactions: [
      { id: 1, type: 'Deposit', amount: '25', date: '2025-03-15', status: 'Completed' },
      { id: 2, type: 'Investment', amount: '50', date: '2025-03-14', status: 'Pending' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/pesalogo.png" alt="Pesapop Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-white">Pesadrop</span>
            </div>
            {!isConnected ? (
              <button 
                onClick={() => setIsConnected(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowAccountDetails(!showAccountDetails)}
                  className="bg-green-600/20 hover:bg-green-600/30 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
                >
                  <span>{accountData.id}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showAccountDetails && (
                  <div className="absolute right-0 mt-2 w-72 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-white">
                        <span>Balance:</span>
                        <span className="font-bold">{accountData.balance} HBAR</span>
                      </div>
                      <button 
                        onClick={() => setIsConnected(false)}
                        className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 rounded-lg font-medium transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!isConnected ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="text-left animate-fadeIn">
                <h1 className="text-5xl font-bold text-white mb-6">Grow Your Wealth Naturally</h1>
                <p className="text-xl text-green-100 mb-8">Join our community of micro-investors and watch your investments flourish with as little as 1 HBAR</p>
                <button 
                  onClick={() => setIsConnected(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors text-lg"
                >
                  Start Investing Now
                </button>
              </div>
              <div className="relative animate-fadeIn-delay-1">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
                  alt="Investment Growth"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-fadeIn-delay-1">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Secure Investment</h3>
                <p className="text-green-100">Protected by Hedera's secure distributed ledger technology</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-fadeIn-delay-2">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Community Power</h3>
                <p className="text-green-100">Join forces with other investors for better opportunities</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-fadeIn-delay-2">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Sustainable Growth</h3>
                <p className="text-green-100">Watch your investments grow steadily over time</p>
              </div>
            </div>

            <div className="mt-24 text-center animate-fadeIn-delay-2">
              <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80"
                    alt="Connect Wallet"
                    className="rounded-xl shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">1. Connect Wallet</h3>
                  <p className="text-green-100">Link your Hedera wallet securely</p>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=500&q=80"
                    alt="Deposit Funds"
                    className="rounded-xl shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">2. Deposit HBAR</h3>
                  <p className="text-green-100">Start with as little as 1 HBAR</p>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=500&q=80"
                    alt="Watch Growth"
                    className="rounded-xl shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">3. Watch It Grow</h3>
                  <p className="text-green-100">Track your investment progress</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Total Pool Value</h3>
                </div>
                <p className="text-3xl font-bold text-white">350 HBAR</p>
                <p className="text-green-200 mt-2">Target: 500 HBAR</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Investors</h3>
                </div>
                <p className="text-3xl font-bold text-white">125</p>
                <p className="text-green-200 mt-2">Target: 200</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <ArrowUpFromLine className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-white">Your Investment</h3>
                <p className="text-3xl font-bold text-white">50 HBAR</p>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setActiveTab('transactions')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors text-lg"
              >
                View Transactions
              </button>
            </div>

            {activeTab === 'transactions' && (
              <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Your Transactions</h3>
                {accountData.transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between py-3 border-b border-gray-600">
                    <div>
                      <p className="text-lg text-white">{tx.type}</p>
                      <p className="text-sm text-green-100">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${tx.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{tx.amount} HBAR</p>
                      <p className="text-sm text-green-100">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/50 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4 space-x-8">
            <Facebook className="h-8 w-8" />
            <Twitter className="h-8 w-8" />
            <Linkedin className="h-8 w-8" />
            <Instagram className="h-8 w-8" />
          </div>
          <p className="text-sm">© 2025 Pesadrop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
