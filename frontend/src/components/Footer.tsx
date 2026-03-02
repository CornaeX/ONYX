import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#1E2D4A] bg-[#050C1F] pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top Section: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16 border-b border-[#1E2D4A] pb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-extrabold text-white italic tracking-tighter mb-4">
            ONYX <span className="text-[#007AFF] text-lg not-italic font-normal">vercel.app</span>
          </h2>
            <p className="text-gray-500 text-sm">
              The world's leading crypto casino & sportsbook. 
              Fairness, speed, and privacy guaranteed.
            </p>
          </div>
          

          {/* Games Links */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Games</h3>
            <ul className="flex flex-wrap gap-6 text-sm text-gray-400">
              {['Table Games', 'Slots', 'Lottery', 'Crash'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#007AFF] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Payment Methods & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          
           <p>© 2024 ONYX Games. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

        </div>
      </div>
    </footer>
  );
};