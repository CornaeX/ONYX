import React, { useState } from 'react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, CheckCircle2, DollarSign, ChevronLeft } from 'lucide-react';
import { useStore } from "../store/useStore";
import { deposit, withdraw } from "../services/walletService";
import { useNavigate } from "react-router-dom";

type TransactionType = 'deposit' | 'withdraw';

export default function BankPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TransactionType>('deposit');
    const [amount, setAmount] = useState<string>('');
    const { balance, setBalance } = useStore();

    const quickAmounts = [50, 100, 500, 1000];

    const handleTransaction = async (e: React.FormEvent) => {
        e.preventDefault();

    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    try {
        let updatedWallet;

        if (activeTab === "deposit") {
        updatedWallet = await deposit(val);
        } else {
        updatedWallet = await withdraw(val);
        }

        setBalance(updatedWallet.balance);
        setAmount("");

    } catch (err) {
        alert("Transaction failed");
        console.error(err);
    }
    };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-slate-800 overflow-hidden">
        
        {/* Header section */}
        <div className="p-8 pb-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-6">

            {/* Added Back Button & Title Wrapper */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate(-1)} 
                className="p-1.5 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold tracking-wide text-slate-300">Nexus Wealth</h1>
            </div>
            
            {/* <h1 className="text-xl font-semibold tracking-wide text-slate-300">Nexus Wealth</h1> */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Wallet size={20} className="text-white" />
            </div>
          </div>
          
          <p className="text-sm text-slate-400 uppercase tracking-widest font-medium mb-1">Total Balance</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl text-slate-400">$</span>
            <span className="text-5xl font-light tracking-tight text-white">
              {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="p-8 pt-6">
          {/* Custom Tabs */}
          <div className="flex p-1 bg-slate-950/50 rounded-2xl mb-8 border border-slate-800/50">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'deposit'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ArrowDownCircle size={18} className={activeTab === 'deposit' ? 'text-cyan-400' : ''} />
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'withdraw'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ArrowUpCircle size={18} className={activeTab === 'withdraw' ? 'text-blue-400' : ''} />
              Withdraw
            </button>
          </div>

          <form onSubmit={handleTransaction}>
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-400 mb-2 pl-1">
                Enter Amount
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign size={20} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-2xl font-medium text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none"
                />
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className="flex-1 min-w-[70px] py-2 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold text-lg transition-all duration-300 ${
                !amount || parseFloat(amount) <= 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-blue-500/25 translate-y-[-2px]'
              }`}
            >
              <CheckCircle2 size={20} />
              {activeTab === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}