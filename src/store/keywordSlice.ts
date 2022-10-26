import { StateCreator } from 'zustand';
import { SliceType } from './useBoundStore';

export interface KeywordSlice {
  keyword: string;
  change: (keyword: string) => void;
}

export const createKeywordSlice: StateCreator<SliceType, [], [], KeywordSlice> = (set) => ({
  keyword: '',
  change: (value) => set(() => ({ keyword: value })),
});
