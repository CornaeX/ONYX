import { create } from "zustand";

interface User {
  uid: string;
  username: string;
  role: string;
}

interface UserState {
  user: User | null;
  balance: number;

  setUser: (user: User | null) => void;   // ✅ allow null
  setBalance: (balance: number) => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  balance: 0,

  setUser: (user) => set({ user }),
  setBalance: (balance) => set({ balance }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, balance: 0 });
  }
}));