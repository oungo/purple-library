import create from 'zustand';

interface BookIdState {
  id?: number;
  setId: (id: number) => void;
}

export const useBookIdStore = create<BookIdState>()((set) => ({
  setId: (value) => set(() => ({ id: value })),
}));
