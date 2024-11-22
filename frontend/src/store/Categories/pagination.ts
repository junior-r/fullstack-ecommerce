import { create } from "zustand";

type State = {
  page: string | null;
  setPage: (link: string | null) => void;
};

export const usePaginationStore = create<State>((set) => {
  return {
    page: null,
    setPage: (link: string | null) => set({ page: link }),
  };
});
