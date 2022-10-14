import create from 'zustand';

interface KeywordState {
  keyword: string;
  change: (keyword: string) => void;
}

export const useKeywordStore = create<KeywordState>()((set) => ({
  keyword: '',
  change: (value) => set(() => ({ keyword: value })),
}));
