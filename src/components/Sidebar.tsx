import React from 'react';
import { Home, Gamepad2, Tv, Dices, Trophy, Gift, HelpCircle, Rocket } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Lobby', active: true },
    { icon: Gamepad2, label: 'Table games' },
    { icon: Tv, label: 'Live Shows', count: '4k' },
    { icon: Dices, label: 'Slots' },
    { icon: Rocket, label: 'Crash Games' },
    { icon: Trophy, label: 'Rewards' },
  ];

  return (
    <div className="flex flex-col h-full text-gray-400">
      
      {/* 1. Logo Section */}
      <div className="h-[80px] flex items-center px-6 border-b border-[#1E2D4A]">
        <h1 className="text-2xl font-extrabold text-white italic tracking-tighter flex items-center gap-2">
          ONYX <span className="text-[#007AFF] text-sm not-italic font-normal opacity-90">kacyno.io</span>
        </h1>
      </div>

      {/* 2. Menu Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-[11px] font-bold text-gray-500 uppercase px-4 mb-2 tracking-wider">Casino</div>
        
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-white/5 hover:text-white ${
              item.active ? 'bg-[#007AFF]/10 text-white' : ''
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-[#007AFF]' : 'group-hover:text-[#007AFF] transition-colors'}`} />
            <span className="font-medium text-sm">{item.label}</span>
            {item.count && (
              <span className="ml-auto text-[10px] bg-[#1E2D4A] text-white px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </button>
        ))}

      </div>

    </div>
  );
};