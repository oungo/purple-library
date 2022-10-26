import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface BookIdSlice {
  id?: number;
  setId: (id: number) => void;
}

export const createBookIdSlice: StateCreator<SliceType, [], [], BookIdSlice> = (set) => ({
  setId: (value) => set(() => ({ id: value })),
});
