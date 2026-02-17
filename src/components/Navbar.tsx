import React from 'react';
import { Search, Bell, Gift, Wallet, ChevronDown, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { user, balance } = useStore();

  return (
    <div className="h-full flex items-center justify-between px-6 w-full">
      
      {/* ---------------------------------------------------------
          LEFT ZONE: SEARCH & SWITCHER
      --------------------------------------------------------- */}
      <div className="flex items-center gap-6">
        
        {/* 1. Search Bar (Glass Effect) */}
        <div className="hidden md:flex items-center bg-[#0B1426] border border-[#1E2D4A] rounded-full px-4 py-2 w-64 hover:border-blue-500/50 transition-colors group">
          <Search className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
          <input 
            type="text" 
            placeholder="Search game..." 
            className="bg-transparent border-none text-sm text-white focus:outline-none ml-2 w-full placeholder-gray-600"
          />
        </div>

        {/* 2. Casino / Sports Switch (The "Floating Pill") */}
        <div className="hidden lg:flex bg-[#0B1426] p-1 rounded-xl border border-[#1E2D4A]">
           <button className="px-6 py-2 rounded-lg text-xs font-bold bg-[#007AFF] text-white shadow-[0_0_15px_rgba(0,122,255,0.3)]">
             CASINO
           </button>
           <button className="px-6 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors">
             SPORTS
           </button>
        </div>
      </div>


      {/* ---------------------------------------------------------
          RIGHT ZONE: REWARDS & WALLET (The "Separated" Look)
      --------------------------------------------------------- */}
      <div className="flex items-center">
        
        {/* 3. THE REWARD SECTION (Visually Separated) */}
        <div className="hidden md:flex items-center gap-3 mr-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#00D166] uppercase tracking-wider">Rakeback</span>
            <div className="w-24 h-1.5 bg-[#121E36] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[#00D166] to-[#00FFA3]"></div>
            </div>
          </div>
          <button className="bg-[#121E36] hover:bg-[#1E2D4A] p-2.5 rounded-xl border border-[#1E2D4A] group transition-all relative">
            <Gift className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* THE SEPARATOR LINE */}
        <div className="h-10 w-px bg-[#1E2D4A] mx-2"></div>

        {/* 4. WALLET & PROFILE */}
        <div className="flex items-center gap-4 pl-6">
          
          {user ? (
            <>
              {/* Wallet Display */}
              <div className="flex items-center bg-[#0B1426] border border-[#1E2D4A] rounded-xl p-1 pr-4">
                <button className="bg-[#007AFF] hover:bg-[#0062CC] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-900/20 transition-all mr-3">
                  Wallet
                </button>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-gray-500 font-bold uppercase">Main Balance</span>
                   <span className="text-white font-mono font-bold leading-none">${balance.toLocaleString()}</span>
                </div>
              </div>

              {/* Profile Pic */}
              <button className="w-10 h-10 rounded-xl bg-[#121E36] border border-[#1E2D4A] flex items-center justify-center hover:border-blue-500 transition-colors">
                <User className="w-5 h-5 text-gray-400" />
              </button>
            </>
          ) : (
            <>
              <button className="text-gray-400 hover:text-white font-bold text-sm">Sign In</button>
              <button className="bg-[#007AFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(0,122,255,0.2)] hover:shadow-[0_4px_25px_rgba(0,122,255,0.4)] transition-all">
                Register
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};