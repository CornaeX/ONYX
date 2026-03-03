import { create } from "zustand";

interface User {
  uid: string;
  username: string;
  role: string;
}

interface UserState {
  user: User | null;
  balance: number;
  rakeback: number; // Add this
  activeCategory: string;

  setUser: (user: User | null) => void;
  setBalance: (balance: number) => void;
  setRakeback: (rakeback: number) => void; // Add this
  setActiveCategory: (category: string) => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  balance: 0,
  rakeback: 0, // Initialize
  activeCategory: 'All Games',

  setUser: (user) => set({ user }),
  setBalance: (balance) => set({ balance }),
  setRakeback: (rakeback) => set({ rakeback }),
  setActiveCategory: (category) => set({ activeCategory: category }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, balance: 0, rakeback: 0, activeCategory: 'All Games' });
  }
}));