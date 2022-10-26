import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface ModalSlice {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const createModalSlice: StateCreator<SliceType, [], [], ModalSlice> = (set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
});
