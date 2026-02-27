import { useState, useEffect } from 'react';

// --- Types ---
export type CardType = {
  suit: string;
  value: string;
};

// --- Helper Functions ---
const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const getNewDeck = (): CardType[] => {
  const deck: CardType[] = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }
  // Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const calculateScore = (hand: CardType[]): number => {
  let score = 0;
  let aces = 0;
  hand.forEach((card) => {
    if (['J', 'Q', 'K'].includes(card.value)) score += 10;
    else if (card.value === 'A') { score += 11; aces += 1; }
    else score += parseInt(card.value);
  });
  while (score > 21 && aces > 0) { score -= 10; aces -= 1; }
  return score;
};

// --- Animated Card Component ---
const PlayingCard = ({ card, hidden }: { card: CardType; hidden: boolean }) => {
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

// --- Main Game Component ---
export function Game() {
  const [balance, setBalance] = useState<number>(1150);
  const [currentBet, setCurrentBet] = useState<number>(0);
  
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  
  const [gameState, setGameState] = useState<string>('betting'); 
  const [message, setMessage] = useState<string>('');

  const addBet = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setCurrentBet(prev => prev + amount);
    }
  };

  const clearBet = () => {
    setBalance(prev => prev + currentBet);
    setCurrentBet(0);
  };

  const allIn = () => {
    setCurrentBet(prev => prev + balance);
    setBalance(0);
  };

  const startRound = () => {
    if (currentBet === 0) return;

    setGameState('dealing');
    setMessage('');
    setPlayerHand([]);
    setDealerHand([]);

    const newDeck = getNewDeck();
    
    const p1 = newDeck.pop()!;
    const d1 = newDeck.pop()!;
    const p2 = newDeck.pop()!;
    const d2 = newDeck.pop()!;
    
    setDeck(newDeck);

    // 👇 CHANGED: Spaced out the dealing timeouts to match the slower animation
    setTimeout(() => setPlayerHand([p1]), 600);
    setTimeout(() => setDealerHand([d1]), 1200);
    setTimeout(() => setPlayerHand([p1, p2]), 1800);
    setTimeout(() => {
      setDealerHand([d1, d2]);
      
      const pScore = calculateScore([p1, p2]);
      const dScore = calculateScore([d1, d2]);

      if (pScore === 21 && dScore === 21) handleGameOver('Push! Double Blackjack.', 'push');
      else if (pScore === 21) handleGameOver('BLACKJACK! 🎉', 'blackjack');
      else if (dScore === 21) handleGameOver('Dealer Blackjack.', 'lose');
      else setGameState('playerTurn');

    }, 2400); // Wait until the last card finishes before opening controls
  };

  const hit = () => {
    const newCard = deck.pop();
    if (!newCard) return; 
    
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);

    if (calculateScore(newHand) > 21) {
      handleGameOver('Bust! Over 21.', 'lose');
    }
  };

  const handleGameOver = (msg: string, result: 'win' | 'lose' | 'push' | 'blackjack') => {
    setGameState('gameOver');
    setMessage(msg);
    
    if (result === 'win') {
      setBalance(prev => prev + (currentBet * 2));
    } else if (result === 'blackjack') {
      setBalance(prev => prev + (currentBet * 2.5));
    } else if (result === 'push') {
      setBalance(prev => prev + currentBet);
    }
  };

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const dScore = calculateScore(dealerHand);
      if (dScore < 17) {
        const timer = setTimeout(() => {
          const nextCard = deck.pop();
          if (nextCard) { 
            setDealerHand(prev => [...prev, nextCard]);
          }
        // 👇 CHANGED: Slowed down the dealer's hits too for suspense!
        }, 1500); 
        return () => clearTimeout(timer);
      } else {
        const pScore = calculateScore(playerHand);
        if (dScore > 21) handleGameOver('Dealer Busts! You Win 🏆', 'win');
        else if (dScore > pScore) handleGameOver('Dealer Wins.', 'lose');
        else if (dScore < pScore) handleGameOver('You Win! 🏆', 'win');
        else handleGameOver('Push! It\'s a tie.', 'push');
      }
    }
  }, [gameState, dealerHand, deck, playerHand]);

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  return (
    <div className="flex flex-col items-center justify-between h-[600px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden font-sans text-white">
      
      {/* Table Felt Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* TOP BAR: Balance Info */}
      <div className="w-full flex justify-between items-center z-10 border-b border-gray-800 pb-4">
        <div className="text-gray-400 font-bold">Bankroll: <span className="text-green-400 text-xl ml-2">${balance.toFixed(2)}</span></div>
        <div className="text-gray-400 font-bold">Current Bet: <span className="text-yellow-400 text-xl ml-2">${currentBet.toFixed(2)}</span></div>
      </div>

      {/* CENTER STAGE */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 my-4">
        
        {gameState === 'betting' ? (
           <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
               <span className="text-yellow-400 text-3xl font-bold">${currentBet}</span>
             </div>
             <h2 className="text-2xl font-bold text-gray-300">Place Your Bets</h2>
           </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8 relative">
            
            {/* Dealer Hand */}
            <div className="text-center relative min-h-[160px]">
              {gameState !== 'dealing' && <h3 className="text-gray-500 font-bold tracking-widest text-xs mb-3">DEALER {gameState === 'gameOver' && `- ${dealerScore}`}</h3>}
              <div className="flex justify-center -space-x-12">
                {dealerHand.map((card, i) => (
                  // 👇 CHANGED: Better key for React animations
                  <PlayingCard key={`${card.suit}-${card.value}-${i}`} card={card} hidden={gameState !== 'gameOver' && i === 0} />
                ))}
              </div>
            </div>

            {/* Middle Message Bubble */}
            <div className="h-10 flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20">
               {message && (
                 <div className="bg-blue-600 text-white px-8 py-2 rounded-full font-black shadow-lg animate-bounce border border-blue-400">
                   {message}
                 </div>
               )}
            </div>

            {/* Player Hand */}
            <div className="text-center relative min-h-[160px]">
              <div className="flex justify-center -space-x-12 mb-3">
                {playerHand.map((card, i) => (
                  // 👇 CHANGED: Better key for React animations
                  <PlayingCard key={`${card.suit}-${card.value}-${i}`} card={card} hidden={false} />
                ))}
              </div>
              {gameState !== 'dealing' && playerHand.length > 0 && <h3 className="text-blue-400 font-bold tracking-widest text-xs">YOUR SCORE: {playerScore}</h3>}
            </div>

          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="w-full z-10 p-4 bg-[#0B1426] rounded-xl border border-gray-800 flex justify-center mt-auto">
        
        {gameState === 'betting' ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-4">
              {[10, 25, 50, 100].map(amt => (
                <button 
                  key={amt} onClick={() => addBet(amt)} disabled={balance < amt}
                  className="w-14 h-14 rounded-full font-bold text-sm border-2 border-dashed transition-transform hover:scale-110 active:scale-95 disabled:opacity-50 flex items-center justify-center bg-[#112240] border-gray-600 hover:border-blue-400 hover:text-blue-400"
                >
                  ${amt}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4 w-full justify-center">
              <button onClick={clearBet} disabled={currentBet === 0} className="px-6 py-2 rounded border border-red-900/50 hover:bg-red-900/30 text-gray-400 hover:text-red-400 font-bold transition-colors">Clear</button>
              <button onClick={startRound} disabled={currentBet === 0} className="px-10 py-2 rounded bg-green-600 hover:bg-green-500 text-white font-bold transition-colors disabled:opacity-50">DEAL</button>
              <button onClick={allIn} disabled={balance === 0} className="px-6 py-2 rounded border border-yellow-900/50 hover:bg-yellow-900/30 text-gray-400 hover:text-yellow-400 font-bold transition-colors">All In</button>
            </div>
          </div>
        ) : gameState === 'dealing' ? (
          <div className="text-gray-400 font-bold animate-pulse py-2">Dealing...</div>
        ) : gameState === 'playerTurn' ? (
          <div className="flex gap-4">
            <button onClick={hit} className="bg-[#112240] border border-blue-500/50 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded transition-all">HIT</button>
            <button onClick={() => setGameState('dealerTurn')} className="bg-[#112240] border border-red-500/50 hover:bg-red-600 text-white font-bold py-2 px-8 rounded transition-all">STAND</button>
          </div>
        ) : gameState === 'gameOver' ? (
          <button onClick={() => { setGameState('betting'); setCurrentBet(0); setMessage(''); }} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded transition-all">
            NEW BET
          </button>
        ) : (
          <div className="text-gray-400 font-bold animate-pulse py-2">Dealer Turn...</div>
        )}

      </div>
      
    </div>
  );
}