import { useEffect, useState } from 'react';

export type CardType = {
  suit: string;
  value: string;
};

export const PlayingCard = ({ card, hidden }: { card: CardType; hidden: boolean }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // 👇 CHANGED: Increased from 10ms to 50ms so the browser doesn't skip the animation
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    opacity: mounted ? 1 : 0,
    transform: mounted 
      ? 'translate(0px, 0px) rotate(0deg) scale(1)' 
      : 'translate(400px, -400px) rotate(180deg) scale(0.3)',
    transition: `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)`
  };

  if (hidden) {
    return (
      <div style={style} className="w-24 h-36 bg-[repeating-linear-gradient(45deg,#112240,#112240_10px,#0B1426_10px,#0B1426_20px)] rounded-xl border-2 border-gray-600 shadow-2xl flex items-center justify-center relative">
        <div className="w-20 h-32 border border-gray-600/50 rounded-lg"></div>
      </div>
    );
  }

  const isRed = card.suit === '♥' || card.suit === '♦';
  
  return (
    <div style={style} className="relative w-24 h-36 bg-white rounded-xl border-2 border-gray-300 shadow-2xl flex items-center justify-center">
      <div className={`absolute top-2 left-2 text-xl font-bold leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
      <div className={`text-6xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>
      <div className={`absolute bottom-2 right-2 text-xl font-bold leading-none rotate-180 ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
    </div>
  );
};