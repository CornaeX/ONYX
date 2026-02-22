import React, { useState } from 'react';
import { 
  Gamepad2, Tv, LayoutGrid, Rocket, 
  Video, Crown, Gift, Award, 
  BookOpen, Users, Headset, ChevronUp,
  Bomb, Globe, Coins
} from 'lucide-react';

export const Sidebar = () => {
  const [isCasinoOpen, setIsCasinoOpen] = useState(true);

  const casinoItems = [
    { icon: Gamepad2, label: 'Table games' },
    { icon: LayoutGrid, label: 'Slots' },
    { icon: Rocket, label: 'EarnBet' },
    { icon: Gift, label: 'Lottery' },
  ];

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
            vercel.app
          </span>
        </div>
      </div>

      {/* 2. Top Quick Icons */}
      <div className="px-4 mt-2 mb-6">
        <div className="flex justify-center gap-2">
          {[
            { icon: <Bomb size={20} className="text-gray-300" />, color: 'from-gray-700/50' },
            { icon: <Rocket size={20} className="text-red-400" />, color: 'from-red-900/50' },
            { icon: <Globe size={20} className="text-pink-400" />, color: 'from-purple-900/50' },
            { icon: <Coins size={20} className="text-yellow-400" />, color: 'from-yellow-700/50' }
          ].map((item, i) => (
            <div key={i} className={`w-12 h-12 rounded-xl bg-gradient-to-b ${item.color} to-[#0a162e] border border-white/10 flex items-center justify-center shadow-lg cursor-pointer hover:-translate-y-1 transition-transform group`}>
               <div className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all">
                 {item.icon}
               </div>
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
                  <button key={idx} className="w-full flex items-center gap-3 px-4 py-2.5 hover:text-white transition-colors group">
                    <item.icon size={18} className="text-[#4e6285] group-hover:text-blue-400 transition-colors" />
                    <span className="text-[13px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other Sections */}
        <div className="mt-4 pt-2 border-t border-white/5 space-y-1">
          {[
            { icon: Award, label: 'Rewards', count: '26' },
            { icon: BookOpen, label: 'Blog' },
            { icon: Crown, label: 'Vip Club' },
            { icon: Users, label: 'Affiliate Program' },
          ].map((item, idx) => (
            <button key={idx} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 rounded-xl transition-all group">
              <item.icon size={18} className="text-[#4e6285] group-hover:text-blue-400" />
              <span className="text-[13px] font-medium">{item.label}</span>
              {item.count && (
                 <span className="ml-auto text-[10px] bg-blue-600/90 text-white px-2 py-0.5 rounded-md shadow-lg shadow-blue-900/20">
                 {item.count}
               </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Support Button */}
      <div className="p-4 pt-2">
        <button className="w-full bg-gradient-to-b from-[#1e2d4d] to-[#0a162e] border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 text-white font-bold shadow-xl hover:brightness-125 transition-all">
          <Headset size={20} className="text-blue-400" />
          <span>Support</span>
        </button>
      </div>

    </div>
  );
};