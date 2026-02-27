import { useState, useEffect } from 'react';
import { PlayingCard, type CardType } from './PlayingCard';
import placeBetSFX from '../../../assets/sounds/betplace.mp3';
import cardSwipeSFX from '../../../assets/sounds/cardswipe.mp3';
import clearBetSFX from '../../../assets/sounds/clearbet.mp3';
import winSFX from '../../../assets/sounds/win.mp3';
import loseSFX from '../../../assets/sounds/lose.mp3';

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

// --- Main Game Component ---
export function Blackjack() {
  const [balance, setBalance] = useState<number>(1150);
  const [currentBet, setCurrentBet] = useState<number>(0);
  
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  
  const [splitHand, setSplitHand] = useState<CardType[]>([]);
  const [activeHand, setActiveHand] = useState<number>(0); // 0 = main hand, 1 = split hand
  
  const [gameState, setGameState] = useState<string>('betting'); 
  const [message, setMessage] = useState<string>('');

  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile); 
    audio.play().catch(error => console.log('Audio playback prevented:', error));
  };

  const addBet = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setCurrentBet(prev => prev + amount);
      playSound(placeBetSFX);
    }
  };

  const clearBet = () => {
    setBalance(prev => prev + currentBet);
    playSound(clearBetSFX);
    setCurrentBet(0);
  };

  const allIn = () => {
    if (balance > 0) { 
      setCurrentBet(prev => prev + balance);
      setBalance(0);
      playSound(placeBetSFX);
    }
  };

  const startRound = () => {
    if (currentBet === 0) return;

    setGameState('dealing');
    setMessage('');
    setPlayerHand([]);
    setSplitHand([]); // Reset split state
    setActiveHand(0); // Reset active hand
    setDealerHand([]);

    const newDeck = getNewDeck();
    
    const p1 = newDeck.pop()!;
    const d1 = newDeck.pop()!;
    const p2 = newDeck.pop()!;
    const d2 = newDeck.pop()!;
    
    setDeck(newDeck);

    setTimeout(() => { setPlayerHand([p1]); playSound(cardSwipeSFX); }, 600);
    setTimeout(() => { setDealerHand([d1]); playSound(cardSwipeSFX); }, 1200);
    setTimeout(() => { setPlayerHand([p1, p2]); playSound(cardSwipeSFX); }, 1800);
    setTimeout(() => {
      setDealerHand([d1, d2]);
      playSound(cardSwipeSFX); 
      
      setTimeout(() => {
        const pScore = calculateScore([p1, p2]);
        const dScore = calculateScore([d1, d2]);

        if (pScore === 21 && dScore === 21) handleGameOver('Push! Double Blackjack.', currentBet);
        else if (pScore === 21) handleGameOver('BLACKJACK! 🎉', currentBet * 2.5);
        else if (dScore === 21) handleGameOver('Dealer Blackjack.', 0);
        else setGameState('playerTurn');
      }, 800); 

    }, 2400);
  };

  const hit = () => {
    const newCard = deck.pop();
    if (!newCard) return; 
    playSound(cardSwipeSFX);

    if (activeHand === 0) {
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);
      if (calculateScore(newHand) > 21) {
        setTimeout(() => {
          if (splitHand.length > 0) setActiveHand(1); 
          else handleGameOver('Bust! Over 21.', 0); 
        }, 800); 
      }
    } else {
      const newHand = [...splitHand, newCard];
      setSplitHand(newHand);
      if (calculateScore(newHand) > 21) {
        setTimeout(() => setGameState('dealerTurn'), 800); 
      }
    }
  };

  const stand = () => {
    if (activeHand === 0 && splitHand.length > 0) {
      setActiveHand(1);
    } else {
      setGameState('dealerTurn');
    }
  };

  const doubleDown = () => {
    if (balance < currentBet) return;
    setBalance(prev => prev - currentBet);
    setCurrentBet(prev => prev * 2);
    playSound(placeBetSFX);
    
    const newCard = deck.pop();
    if (!newCard) return; 
    
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    playSound(cardSwipeSFX);

    setTimeout(() => {
      if (calculateScore(newHand) > 21) handleGameOver('Bust! Over 21.', 0);
      else setGameState('dealerTurn');
    }, 800);
  };

  const split = () => {
    if (balance < currentBet) return;
    setBalance(prev => prev - currentBet);
    playSound(placeBetSFX);
    
    setPlayerHand([playerHand[0]]);
    setSplitHand([playerHand[1]]);
  };

  const handleGameOver = (msg: string, payout: number) => {
    setGameState('gameOver');
    setMessage(msg);
    
    if (payout > currentBet) playSound(winSFX);
    else if (payout > 0) playSound(cardSwipeSFX); 
    else playSound(loseSFX);
    
    setBalance(prev => prev + payout);
  };

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const dScore = calculateScore(dealerHand);
      if (dScore < 17) {
        const timer = setTimeout(() => {
          const nextCard = deck.pop();
          if (nextCard) { 
            setDealerHand(prev => [...prev, nextCard]);
            playSound(cardSwipeSFX);
          }
        }, 1500); 
        return () => clearTimeout(timer);
      } else {
        const resultTimer = setTimeout(() => {
          
          let totalPayout = 0;
          let finalMsg = '';

          const evaluateHand = (hand: CardType[], name: string) => {
            const pScore = calculateScore(hand);
            if (pScore > 21) { finalMsg += `${name} Busts. `; return 0; }
            if (dScore > 21) { finalMsg += `Dealer Busts, ${name} Wins! 🏆 `; return currentBet * 2; }
            if (pScore > dScore) { finalMsg += `${name} Wins! 🏆 `; return currentBet * 2; }
            if (pScore < dScore) { finalMsg += `${name} Loses. `; return 0; }
            finalMsg += `${name} Pushes. `; return currentBet;
          };

          if (splitHand.length > 0) {
             totalPayout += evaluateHand(playerHand, 'Hand 1');
             totalPayout += evaluateHand(splitHand, 'Hand 2');
          } else {
             const pScore = calculateScore(playerHand);
             if (pScore > 21) { finalMsg = 'Bust! Over 21.'; totalPayout = 0; }
             else if (dScore > 21) { finalMsg = 'Dealer Busts! You Win 🏆'; totalPayout = currentBet * 2; }
             else if (pScore > dScore) { finalMsg = 'You Win! 🏆'; totalPayout = currentBet * 2; }
             else if (pScore < dScore) { finalMsg = 'Dealer Wins.'; totalPayout = 0; }
             else { finalMsg = 'Push! It\'s a tie.'; totalPayout = currentBet; }
          }

          handleGameOver(finalMsg.trim(), totalPayout);
        }, 800);
        return () => clearTimeout(resultTimer);
      }
    }
  }, [gameState, dealerHand, deck, playerHand, splitHand]);

  // 👇 CHANGED: Calculate visible dealer score (ignoring hole card when it's hidden)
  const hideDealerCard = gameState === 'dealing' || gameState === 'playerTurn';
  const visibleDealerScore = hideDealerCard && dealerHand.length > 0 
    ? calculateScore(dealerHand.slice(1)) // Only count cards from index 1 onward
    : calculateScore(dealerHand);         // Count everything

  const canDouble = playerHand.length === 2 && splitHand.length === 0 && balance >= currentBet;
  const canSplit = playerHand.length === 2 && splitHand.length === 0 && balance >= currentBet && calculateScore([playerHand[0]]) === calculateScore([playerHand[1]]);

  return (
    <div className="flex flex-col items-center justify-between h-[650px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden font-sans text-white">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center z-10 border-b border-gray-800 pb-4">
        <div className="text-gray-400 font-bold">Bankroll: <span className="text-green-400 text-xl ml-2">${balance.toFixed(2)}</span></div>
        <div className="text-gray-400 font-bold">
          {splitHand.length > 0 ? "Total Bet:" : "Current Bet:"} 
          <span className="text-yellow-400 text-xl ml-2">${(currentBet * (splitHand.length > 0 ? 2 : 1)).toFixed(2)}</span>
        </div>
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
              {gameState !== 'dealing' && (
                <h3 className="text-gray-500 font-bold tracking-widest text-xs mb-3">
                  DEALER {dealerHand.length > 1 && `- ${visibleDealerScore}`}
                </h3>
              )}
              <div className="flex justify-center -space-x-12">
                {dealerHand.map((card, i) => (
                  <PlayingCard key={`${card.suit}-${card.value}-${i}`} card={card} hidden={hideDealerCard && i === 0} />
                ))}
              </div>
            </div>

            {/* Middle Message Bubble */}
            <div className="h-10 flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20">
               {message && (
                 <div className="bg-blue-600 text-white px-8 py-2 rounded-full font-black shadow-lg animate-bounce border border-blue-400 text-center max-w-sm leading-tight">
                   {message}
                 </div>
               )}
            </div>

            {/* Player Hands */}
            <div className="flex gap-8">
              
              {/* Hand 1 */}
              <div className={`text-center transition-all ${activeHand === 0 && splitHand.length > 0 && gameState !== 'gameOver' ? 'scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : splitHand.length > 0 && activeHand !== 0 ? 'opacity-50 scale-90' : ''}`}>
                <div className="flex justify-center -space-x-12 mb-3">
                  {playerHand.map((card, i) => (
                    <PlayingCard key={`p1-${card.suit}-${card.value}-${i}`} card={card} hidden={false} />
                  ))}
                </div>
                {gameState !== 'dealing' && playerHand.length > 0 && <h3 className="text-blue-400 font-bold tracking-widest text-xs">SCORE: {calculateScore(playerHand)}</h3>}
              </div>

              {/* Hand 2 (Only shows if split) */}
              {splitHand.length > 0 && (
                 <div className={`text-center transition-all ${activeHand === 1 && gameState !== 'gameOver' ? 'scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : gameState !== 'gameOver' && activeHand !== 1 ? 'opacity-50 scale-90' : ''}`}>
                   <div className="flex justify-center -space-x-12 mb-3">
                     {splitHand.map((card, i) => (
                       <PlayingCard key={`p2-${card.suit}-${card.value}-${i}`} card={card} hidden={false} />
                     ))}
                   </div>
                   {splitHand.length > 0 && <h3 className="text-blue-400 font-bold tracking-widest text-xs">SCORE: {calculateScore(splitHand)}</h3>}
                 </div>
              )}

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
          <div className="flex gap-3">
            <button onClick={hit} className="bg-[#112240] border border-blue-500/50 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-all">HIT</button>
            <button onClick={stand} className="bg-[#112240] border border-red-500/50 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-all">STAND</button>
            {canDouble && <button onClick={doubleDown} className="bg-[#112240] border border-yellow-500/50 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition-all">DOUBLE</button>}
            {canSplit && <button onClick={split} className="bg-[#112240] border border-purple-500/50 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded transition-all">SPLIT</button>}
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