import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

type User = {
  id: number;
  name: string;
  username: string;
};

const users: User[] = [
  { id: 1, name: 'JohnDoe', username: 'john' },
  { id: 2, name: 'JaneSmith', username: 'jane' },
  { id: 3, name: 'PeterJones', username: 'peter' },
  { id: 4, name: 'MaryWilliams', username: 'mary' },
  { id: 5, name: 'DavidBrown', username: 'david' },
];

const WinnerPanel = () => {
  const [winner, setWinner] = useState<User | null>(null);
  const [prize, setPrize] = useState(0);

  const selectRandomWinner = () => {
    // Select a random logged-in user
    const loggedInUser = users[Math.floor(Math.random() * users.length)];

    // Filter out the logged-in user
    const otherUsers = users.filter(user => user.id !== loggedInUser.id);

    // Select a random winner from the filtered list
    const randomWinner = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    
    // Generate a random prize
    const randomPrize = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;

    setWinner(randomWinner);
    setPrize(randomPrize);
  };

  useEffect(() => {
    selectRandomWinner(); // Select initial winner
    const intervalId = setInterval(selectRandomWinner, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (!winner) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-center gap-4">
      <Gift className="text-yellow-400" size={24} />
      <p className="text-white">
        User <span className="font-bold text-yellow-400">{winner.id}</span> has won{' '}
        <span className="font-bold text-yellow-400">{prize.toLocaleString()}</span> tokens!
      </p>
    </div>
  );
};

export default WinnerPanel;