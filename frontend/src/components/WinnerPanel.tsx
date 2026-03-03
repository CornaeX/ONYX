import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { motion, AnimatePresence, animate } from 'framer-motion';

type Winner = {
  id: number;
  name: string;
};

const WinnerPanel = () => {
  const [winner, setWinner] = useState<Winner | null>(null);
  const [prize, setPrize] = useState(0);

  const selectRandomWinner = () => {
    const numDigits = Math.floor(Math.random() * 4) + 5;
    let winnerName = '';
    for (let i = 0; i < numDigits; i++) {
      winnerName += Math.floor(Math.random() * 10);
    }
    
    // 1. Get the exact random number
    const rawPrize = Math.floor(Math.random() * (2000 - 50 + 1)) + 500;
    // 2. Get the rounded version
    const roundedPrize = Math.floor(rawPrize / 100) * 100;
    
    // 3. Roll the dice: 60% chance for Exact, 40% chance for Rounded
    // Change `0.6` to `0.5` if you want a perfect 50/50 split.
    const finalPrize = Math.random() < 0.6 ? rawPrize : roundedPrize;

    setWinner({ id: Date.now(), name: `User${winnerName}` });
    setPrize(finalPrize);
  };

  useEffect(() => {
    selectRandomWinner();
    const intervalId = setInterval(selectRandomWinner, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex-1 flex justify-center items-center h-16 relative overflow-hidden hidden lg:flex">
      <AnimatePresence mode="wait">
        {winner && (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="relative rounded-xl bg-[#0D1525] border border-blue-500/20 px-4 py-2 shadow-lg min-w-[240px]"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse" />
            
            <div className="relative z-10 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Gift className="text-yellow-400" size={18} />
              </motion.div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Recent Winner</span>
                  <span className="text-[10px] text-blue-400 font-black">•</span>
                  <span className="text-xs font-bold text-white">{winner.name}</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Won <AnimatedPrize prize={prize} /> <span className="text-emerald-500/80">★</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedPrize = ({ prize }: { prize: number }) => {
  const [currentPrize, setCurrentPrize] = useState(0);

  useEffect(() => {
    const controls = animate(0, prize, {
      duration: 1,
      ease: 'circOut',
      onUpdate: (value) => {
        setCurrentPrize(Math.floor(value));
      }
    });
    return () => controls.stop();
  }, [prize]);

  return (
    <span className="font-mono font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
      {currentPrize.toLocaleString()}
    </span>
  );
};

export default WinnerPanel;