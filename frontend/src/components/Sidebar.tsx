import { useState } from 'react';
import { 
  Gamepad2, LayoutGrid, Rocket, 
  Gift, ChevronUp, } from 'lucide-react';
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import cloveImg from "../assets/images/sidebar-clove.jpg";
import coinImg from "../assets/images/sidebar-coin.jpg";
import diceImg from "../assets/images/sidebar-dice.jpg";
import rocketImg from "../assets/images/sidebar-rocket.jpg";

export const Sidebar = () => {
  const [isCasinoOpen, setIsCasinoOpen] = useState(true);
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const { setActiveCategory } = useStore();

  const casinoItems = [
    { icon: Gamepad2, label: 'Strategy Games' },
    { icon: LayoutGrid, label: 'Arcade Games' },
    { icon: Gift, label: 'Random Events' },
    { icon: Rocket, label: 'Timing Challenge' },
  ];

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label);
    navigate("/"); // Ensure user is on home to see the change
  };

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    navigate("/");
  };

  return (
    <div className="w-[17.5rem] h-screen bg-[#020a1a] text-[#8a9db7] flex flex-col font-sans relative overflow-hidden border-r border-white/5">
      
      {/* 1. HEADER CONTAINER */}
      <div className="relative w-full pt-[28px] pb-[12.5px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* GRADIENT SPOTLIGHT (Restricted to header) */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#103680] via-[#051536] to-transparent opacity-90" />
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/30 blur-[50px] rounded-full" />

        {/* LOGO TEXT ALIGNMENT FIX */}
        <div className="relative z-10 w-fit flex flex-col items-end pr-2">
          <span className="text-4xl font-black text-white italic tracking-tighter leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transform -skew-x-6">
            ONYX
          </span>
          <span className="text-[11px] text-white/90 font-bold tracking-widest -mt-1 mr-1">
            .share.zrok.io
          </span>
        </div>
      </div>

      {/* 2. Top Quick Icons */}
      <div className="px-4 mt-2 mb-6">
        <div className="flex justify-center gap-2">
          {[
            { img: coinImg },
            { img: diceImg },
            { img: rocketImg },
            { img: cloveImg }
          ].map((item, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 transition-transform hover:scale-105"
            >
              <img
                src={item.img}
                alt="quick-icon"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Separator Line */}
      <div className="mx-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

      {/* 3. Navigation Area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        
        {/* Active Casino Dropdown */}
        <div className="bg-[#0f1d3a]/60 rounded-2xl border border-white/5 shadow-inner backdrop-blur-sm overflow-hidden">
          <button 
            onClick={() => setIsCasinoOpen(!isCasinoOpen)}
            className="w-full flex items-center justify-between px-4 py-4 text-white bg-gradient-to-r from-blue-900/20 to-transparent"
          >
            <span className="font-bold text-[15px]">Games</span>
            <ChevronUp size={16} className={`text-[#4e6285] transition-transform duration-300 ${isCasinoOpen ? '' : 'rotate-180'}`} />
          </button>

          <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isCasinoOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="pb-3 px-1">
                {casinoItems.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleCategoryClick(item.label)} // Use the label
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:text-white transition-colors group"
                  >
                    <item.icon size={18} />
                    <span className="text-[13px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other Sections */}
        {/* <div className="mt-4 pt-4 border-t border-white/5 space-y-2 px-1">
          {[
            { icon: Award, label: 'Rewards', count: '26' },
            { icon: Trophy, label: 'Rank' },
            // { icon: Crown, label: 'Vip Club' },
            // { icon: Users, label: 'Affiliate Program' },
          ].map((item, idx) => (
            <button key={idx} className="w-full flex items-center gap-3 px-4 py-3 bg-[#121e36]/60 hover:bg-[#1a2a47] rounded-2xl border border-white/5 transition-all group shadow-sm">
              <item.icon size={18} className="text-[#4e6285] group-hover:text-blue-400" />
              <span className="text-[13px] font-medium text-[#8a9db7] group-hover:text-white transition-colors">{item.label}</span>
              {item.count && (
                <span className="ml-auto text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-lg shadow-blue-900/20">
                {item.count}
              </span>
              )}
            </button>
          ))}
        </div> */}
      </div>

      {/* Bottom Logout */}
      {user && (
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-900/20 hover:bg-red-800/40 rounded-2xl border border-red-500/20 transition-all group shadow-sm"
          >
            <LogOut size={18} className="text-red-400 group-hover:text-red-300" />
            <span className="text-[13px] font-medium text-red-400 group-hover:text-red-300 transition-colors">
              Logout
            </span>
          </button>
        </div>
      )}

    </div>
  );
};