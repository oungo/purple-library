import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface BookIdSlice {
  selectedBookId?: number;
  setSelectedBookId: (bookId: number) => void;
}

export const createBookIdSlice: StateCreator<SliceType, [], [], BookIdSlice> = (set) => ({
  setSelectedBookId: (selectedBookId) => set({ selectedBookId }),
});
