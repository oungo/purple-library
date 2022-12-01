import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface BookIdSlice {
  selectedBookId: number | null;
  setSelectedBookId: (bookId: number | null) => void;
}

export const createBookIdSlice: StateCreator<SliceType, [], [], BookIdSlice> = (set) => ({
  selectedBookId: null,
  setSelectedBookId: (selectedBookId) => set({ selectedBookId }),
});
