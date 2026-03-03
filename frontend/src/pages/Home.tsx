import { useState, useMemo, useCallback } from 'react';
import { Search, X } from 'lucide-react'; 
import { useNavigate } from "react-router-dom";
import { useStore } from '../store/useStore';

// Asset imports remain the same
import dailySpinGif from "../assets/gifs/daily-spin.gif";
import crashCardGif from "../assets/gifs/crash-card.gif";
import rakebackFullGif from "../assets/gifs/rakebackfull-card.gif";
import rakebackNotFullGif from "../assets/gifs/rakebacknotfull-card.gif";
import blackjackSmallGif from "../assets/gifs/blackjack-small.gif";
import luckycardSmallGif from "../assets/gifs/luckycard-small.gif";
import slotv1SmallGif from "../assets/gifs/slotv1-small.gif";
import crashSmallGif from "../assets/gifs/crash-small.gif";

// 1. Extract Constants outside component to prevent re-creation
const CLAIM_THRESHOLD = 50;
const CATEGORIES = ['All Games', 'Table Games', 'Slots', 'Lottery', 'Crash'];

export const Home = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  // 2. Destructure everything needed from store once
  const { 
    activeCategory, 
    setActiveCategory, 
    rakeback, 
    setRakeback, 
    setBalance 
  } = useStore();

  // 3. Memoize the game list to prevent unnecessary filtering on every render
  const allPlayableGames = useMemo(() => [
    { id: 'blackjack', name: 'Blackjack', path: '/blackjack', img: blackjackSmallGif, category: 'Table Games' },
    { id: 'slots', name: 'Super Slots', path: '/slotv1', img: slotv1SmallGif, category: 'Slots' },
    { id: 'lottery', name: 'Lucky Draw', path: '/luckycard', img: luckycardSmallGif, category: 'Lottery' },
    { id: 'crash', name: 'Crash', path: '/crash', img: crashSmallGif, category: 'Crash' },
  ], []);

  const filteredGames = useMemo(() => 
    allPlayableGames.filter(game => activeCategory === 'All Games' || game.category === activeCategory)
  , [activeCategory, allPlayableGames]);

  // 4. Memoize handlers to improve performance
  const handleClaimRakeback = useCallback(async () => {
    if (rakeback < CLAIM_THRESHOLD) {
      alert(`You need $${(CLAIM_THRESHOLD - rakeback).toFixed(2)} more to claim!`);
      return;
    }
    try {
      const res = await fetch("https://onyxbackend.share.zrok.io/api/user/claim-rakeback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Successfully claimed $${data.claimed.toFixed(2)}!`);
        setRakeback(data.newRakeback);
        setBalance(data.newBalance);
      }
    } catch (e) {
      console.error("Rakeback claim failed", e);
    }
  }, [rakeback, setRakeback, setBalance]);

  const handleSpinClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000); 
  };

  // 5. Calculate empty slots outside of the return statement
  const emptySlotsCount = activeCategory === 'All Games' ? 8 : 11;

  return (
    <div className="space-y-10 relative">
      
      {/* COMING SOON MESSAGE PANEL */}
      {showComingSoon && (
        <div className="fixed top-10 left-0 right-0 z-[100] flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="pointer-events-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            <div className="relative bg-[#0B1426]/90 backdrop-blur-xl border border-blue-500/50 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="bg-blue-600/20 p-2 rounded-lg"><span className="text-2xl" role="img" aria-label="wheel">🎡</span></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-blue-400 uppercase tracking-tighter">System Error: 418</span>
                <span className="text-base font-medium">
                  Daily Spin Coming Soon: <span className="text-gray-300 italic">Dev.exe has stopped working.</span>
                </span>
              </div>
              <button onClick={() => setShowComingSoon(false)} className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO BANNERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={handleClaimRakeback} className="h-64 rounded-3xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,215,255,0.4)] border border-transparent">
          <img src={rakeback >= CLAIM_THRESHOLD ? rakebackFullGif : rakebackNotFullGif} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Claim Rakeback" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-[#00D166] font-bold text-xs uppercase tracking-widest">Your Rakeback</p>
            <p className="text-white text-xl font-bold">${(rakeback || 0).toFixed(2)}</p>
          </div>
        </div>

        <div onClick={handleSpinClick} className="h-64 rounded-3xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]">
          <img src={dailySpinGif} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Daily Spin" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>

        <div onClick={() => navigate("/crash")} className="h-64 rounded-3xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(215,0,225,0.4)] border border-transparent">
          <img src={crashCardGif} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Crash Game" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-4 left-4">
            <p className="text-[#FF00E5] font-bold text-xs uppercase tracking-widest">Instant Win</p>
            <p className="text-white text-xl font-bold italic">PLAY CRASH</p>
          </div>
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Search className="w-4 h-4 text-white rotate-45" /> 
          </div>
        </div>
      </section>

      {/* SECTION 2: FILTERS */}
      <nav className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#112240] p-4 rounded-xl border border-gray-700">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
           {CATEGORIES.map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveCategory(tab)}
               className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-200 ${
                 activeCategory === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </nav>

      {/* SECTION 3: GAME GRID */}
      <section>
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🔥 {activeCategory === 'All Games' ? 'Trending Games' : `All ${activeCategory}`}
          </h2>
        </header>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredGames.map((game) => (
            <article 
              key={game.id} 
              onClick={() => navigate(game.path)}
              className="aspect-square bg-[#112240] rounded-xl relative group overflow-hidden border border-gray-800 hover:border-blue-500 transition-all cursor-pointer"
            >
              <img src={game.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={game.name} loading="lazy" />
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Play {game.name}
                </button>
                <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">{game.category}</span>
              </div>
            </article>
          ))}

          {[...Array(emptySlotsCount)].map((_, idx) => (
            <div key={`soon-${idx}`} className="aspect-square bg-[#112240]/50 rounded-xl relative border border-gray-800/50 flex items-center justify-center cursor-not-allowed">
              <span className="text-gray-700 font-mono text-[10px] text-center p-2 uppercase tracking-tighter">Coming Soon</span>
              <div className="absolute inset-0 bg-black/5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};