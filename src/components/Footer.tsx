import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Send, ShieldCheck, CreditCard } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#1E2D4A] bg-[#050C1F] pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top Section: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white italic tracking-tighter mb-4">
            ONYX <span className="text-[#007AFF] text-lg not-italic font-normal">kacipo.io</span>
        </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              The world's leading crypto casino & sportsbook. 
              Fairness, speed, and privacy guaranteed.
            </p>
          </div>
          
          <div className="flex gap-3">
             {[Twitter, Instagram, Facebook, Send].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 rounded-xl bg-[#121E36] border border-[#1E2D4A] flex items-center justify-center text-gray-400 hover:bg-[#007AFF] hover:text-white hover:border-[#007AFF] transition-all duration-300">
                 <Icon size={18} />
               </a>
             ))}
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-[#1E2D4A] pb-12">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Casino</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Games', 'Live Casino', 'Slots', 'New Releases', 'Bonus Buy'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#007AFF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Sports</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Football', 'Basketball', 'Tennis', 'Esports', 'Live Events'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#007AFF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Help Center', 'Fairness', 'Affiliates', 'Gamble Aware', 'Live Chat'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#007AFF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Community</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Blog', 'Forum', 'Telegram', 'VIP Club', 'Sponsorships'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#007AFF] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Payment Methods & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          
          <div className="flex flex-col gap-2">
            <p>© 2024 MAX Casino. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
               <a href="#" className="hover:text-white">Privacy Policy</a>
               <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>

          {/* Fake Payment Icons */}
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-1 bg-[#121E36] px-3 py-1.5 rounded border border-[#1E2D4A]">
                <ShieldCheck size={14} /> <span>Secure</span>
             </div>
             <div className="bg-[#121E36] px-3 py-1.5 rounded border border-[#1E2D4A] font-bold text-xs tracking-widest">VISA</div>
             <div className="bg-[#121E36] px-3 py-1.5 rounded border border-[#1E2D4A] font-bold text-xs tracking-widest">BTC</div>
             <div className="bg-[#121E36] px-3 py-1.5 rounded border border-[#1E2D4A] font-bold text-xs tracking-widest">USDT</div>
          </div>

        </div>
      </div>
    </footer>
  );
};