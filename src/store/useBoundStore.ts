import create from 'zustand';
import { BookIdSlice, createBookIdSlice } from './bookIdSlice';
import { createKeywordSlice, KeywordSlice } from './keywordSlice';

export type SliceType = BookIdSlice & KeywordSlice;

export const useBoundStore = create<SliceType>()((...a) => ({
  ...createBookIdSlice(...a),
  ...createKeywordSlice(...a),
}));
