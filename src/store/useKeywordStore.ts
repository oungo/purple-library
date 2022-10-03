import create from 'zustand';

interface IKeywordState {
  keyword: string;
  change: (keyword: string) => void;
}

export const useKeywordStore = create<IKeywordState>()((set) => ({
  keyword: '',
  change: (value) => set(() => ({ keyword: value })),
}));
