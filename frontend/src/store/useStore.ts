import { create } from 'zustand';

// 1. Define the "Shape" of our data
interface User {
  username: string;
  vipLevel: number;
}

interface CasinoState {
  user: User | null;
  balance: number;
  isAuthenticated: boolean;

  // Actions
  login: (username: string) => void;
  logout: () => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean; // Returns true if successful
}

// 2. Create the Store
export const useStore = create<CasinoState>((set, get) => ({
  user: null,
  balance: 0,
  isAuthenticated: false,

  login: (username) => set({ 
    user: { username, vipLevel: 1 }, 
    isAuthenticated: true, 
    balance: 1000 // Sign-up bonus!
  }),

  logout: () => set({ user: null, isAuthenticated: false, balance: 0 }),

  deposit: (amount) => set((state) => ({ 
    balance: state.balance + amount 
  })),

  withdraw: (amount) => {
    const currentBalance = get().balance;
    if (currentBalance >= amount) {
      set({ balance: currentBalance - amount });
      return true;
    }
    return false; // Not enough funds
  },
}));