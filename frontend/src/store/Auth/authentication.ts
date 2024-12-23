import { create } from "zustand";
import { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

type State = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthorized: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthorized: (value: boolean) => void;
  clearTokens: () => void;
};

// Adaptador para localStorage compatible con Zustand
const zustandStorage: PersistStorage<State> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

export const useAuthenticationStore = create<State>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthorized: false,
      setAccessToken: (token: string | null) => set({ accessToken: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      setIsAuthorized: (value: boolean) => set({ isAuthorized: value }),
      clearTokens: () =>
        set({ accessToken: null, refreshToken: null, isAuthorized: false }),
    }),
    {
      name: "auth-storage",
      storage: zustandStorage,
    }
  )
);

export const getAuthenticationStore = () => useAuthenticationStore.getState();
