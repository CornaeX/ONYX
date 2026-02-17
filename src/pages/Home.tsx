import React from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-10">
      
      {/* SECTION 1: HERO BANNERS (3 Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Banner 1: Left */}
        <div className="h-64 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-600 relative overflow-hidden group cursor-pointer border border-blue-500/30">
          <div className="absolute inset-0 flex items-center justify-center text-blue-200/20 text-4xl font-bold">
            PLACE IMAGE HERE <br/> (Bonus Banner)
          </div>
          <div className="absolute bottom-6 left-6">
            <h3 className="text-2xl font-bold mb-2">100% Bonus</h3>
            <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-bold">Deposit</button>
          </div>
        </div>

        {/* Banner 2: Middle */}
        <div className="h-64 rounded-2xl bg-gradient-to-br from-yellow-700 to-yellow-500 relative overflow-hidden group cursor-pointer border border-yellow-500/30">
          <div className="absolute inset-0 flex items-center justify-center text-yellow-200/20 text-4xl font-bold">
             PLACE IMAGE HERE <br/> (Sports Banner)
          </div>
          <div className="absolute bottom-6 left-6">
            <h3 className="text-2xl font-bold mb-2">Bet Builder</h3>
            <button className="bg-black/80 text-white px-6 py-2 rounded-lg font-bold">Bet Now</button>
          </div>
        </div>

        {/* Banner 3: Right */}
        <div className="h-64 rounded-2xl bg-gradient-to-br from-purple-900 to-purple-600 relative overflow-hidden group cursor-pointer border border-purple-500/30">
          <div className="absolute inset-0 flex items-center justify-center text-purple-200/20 text-4xl font-bold">
             PLACE IMAGE HERE <br/> (Telegram/VIP)
          </div>
        </div>
      </section>


      {/* SECTION 2: FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#112240] p-4 rounded-xl border border-gray-700">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
           {['All Games', 'Slots', 'Live', 'Table', 'Jackpots'].map((tab, i) => (
             <button key={i} className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap ${i === 0 ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}>
               {tab}
             </button>
           ))}
        </div>
      </div>


      {/* SECTION 3: TRENDING GAMES (Square Grid) */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">🔥 Trending Slots</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-[#112240] rounded hover:bg-blue-600"><ChevronLeft size={20}/></button>
            <button className="p-2 bg-[#112240] rounded hover:bg-blue-600"><ChevronRight size={20}/></button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="aspect-square bg-[#112240] rounded-xl relative group overflow-hidden border border-gray-800 hover:border-blue-500 transition-all cursor-pointer">
               {/* IMAGE PLACEHOLDER */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs text-center p-2">
                 GAME IMG {i} <br/> (Square)
               </div>
               
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                 <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">Play</button>
                 <span className="text-xs text-gray-400">Demo Mode</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TOP PICKS (Portrait/Vertical Grid) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🏆 Top Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="aspect-[3/4] bg-[#112240] rounded-xl relative group overflow-hidden border border-gray-800 hover:border-yellow-500 transition-all cursor-pointer">
               {/* IMAGE PLACEHOLDER */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs text-center p-2">
                 GAME IMG {i} <br/> (Vertical)
               </div>
               
               {/* Info Label */}
               <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 pt-10">
                 <p className="font-bold text-white">Game Title {i}</p>
                 <p className="text-xs text-gray-400">Provider Name</p>
               </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};