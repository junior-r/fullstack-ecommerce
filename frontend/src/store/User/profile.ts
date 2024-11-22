import { User } from "src/types/user";
import { create } from "zustand";

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserInfoStore = create<State>((set) => {
  return {
    user: null,
    setUser: (user: User | null) => set({ user }),
  };
});
