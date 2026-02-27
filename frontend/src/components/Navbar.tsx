import React from 'react';
import { Search, Gift, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import WinnerPanel from './WinnerPanel';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = useStore((state) => state.user);
  const balance = useStore((state) => state.balance);
  const navigate = useNavigate();

  return (
    // Removed border-b and border-[#1E2D4A] from this wrapper
    <nav className="h-20 flex items-center justify-between px-6 w-full">
      
      {/* LEFT ZONE: Fixed Width */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#0B1426] border border-[#1E2D4A] rounded-full px-4 py-2 w-64 shrink-0">
          <Search className="w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search game..." 
            className="bg-transparent border-none text-sm text-white focus:outline-none ml-2 w-full"
          />
        </div>

        {/* Winner Panel */}
        <div className="hidden lg:block border-l border-[#1E2D4A] pl-4">
          <WinnerPanel />
        </div>
      </div>

      {/* RIGHT ZONE: Fixed Width, Content Aligned Right */}
      <div className="flex items-center justify-end w-[450px]">
        {/* Rakeback Section */}
        <div className="hidden xl:flex items-center gap-3 mr-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#00D166] uppercase tracking-wider">Rakeback</span>
            <div className="w-24 h-1.5 bg-[#121E36] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[#00D166] to-[#00FFA3]"></div>
            </div>
          </div>
          <button className="bg-[#121E36] hover:bg-[#1E2D4A] p-2.5 rounded-xl border border-[#1E2D4A] relative">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-[#1E2D4A] mx-2 hidden md:block"></div>

        {/* Wallet & Profile */}
        <div className="flex items-center gap-4 pl-4">
          {user ? (
            <>
              <div className="flex items-center bg-[#0B1426] border border-[#1E2D4A] rounded-xl p-1 pr-4">
                <button className="bg-[#007AFF] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all mr-3">
                  Wallet
                </button>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">
                    {user.role}
                  </span>
                  <span className="text-white font-mono font-bold leading-none">
                    ${balance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end mr-2">
                <span className="text-xs text-gray-400">
                  {user.username}
                </span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#121E36] border border-[#1E2D4A] flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <button 
              onClick={() => navigate("/login")}
              className="text-gray-400 hover:text-white font-bold text-sm px-2">Sign In</button>
              
              <button 
              onClick={() => navigate("/register")}
              className="bg-[#007AFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};