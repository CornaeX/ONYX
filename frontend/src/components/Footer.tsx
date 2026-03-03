import React from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const navigate = useNavigate();

  const handleCategoryClick = (item: string) => {
    setActiveCategory(item);
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#1E2D4A] bg-[#050C1F] pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16 border-b border-[#1E2D4A] pb-12">
          {/* Brand & Meme Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-extrabold text-white italic tracking-tighter">
                ONYX <span className="text-[#007AFF] text-lg not-italic font-normal">vercel.app</span>
              </h2>
              <span className="bg-green-500/10 border border-green-500/50 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">
                GPA Jackpot 🎰
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "Built with 10% React, 90% caffeine, and 100% 'it works on my machine.' If it crashes, no it didn't—that's just a surprise maintenance feature for my final."
              </p>
              <p className="text-gray-500 text-xs font-mono bg-[#0B1426] p-3 rounded-lg border border-white/5">
                <span className="text-blue-400">System.log:</span> The world's first gamble gaming where the house always wins, but the dev loses sleep. 🚀 Built because my GPA needed a jackpot. To the moon! 💎🙌
              </p>
            </div>
          </div>

          {/* Games Links */}
          <div className="flex flex-col md:items-end self-end">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider opacity-50">Navigation.exe</h3>
            <ul className="flex flex-wrap gap-6 text-sm text-gray-400">
              {['Table Games', 'Slots', 'Lottery', 'Crash'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleCategoryClick(item)} 
                    className="hover:text-[#007AFF] hover:underline underline-offset-4 transition-all"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-gray-600">
           <p>© 2026 CPE32_STUDENT_EDITION. Compiled successfully.</p>
           <div className="flex gap-4">
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Live Final Mode</span>
             <span className="text-gray-800">|</span>
             <span>No Real Money Involved (Sadly)</span>
           </div>
        </div>
      </div>
    </footer>
  );
};