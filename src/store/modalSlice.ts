import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface ModalSlice {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const createModalSlice: StateCreator<SliceType, [], [], ModalSlice> = (set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
});
