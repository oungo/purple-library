import create from 'zustand';
import { BookIdSlice, createBookIdSlice } from './bookIdSlice';
import { createKeywordSlice, KeywordSlice } from './keywordSlice';
import { createModalSlice, ModalSlice } from './modalSlice';

export type SliceType = BookIdSlice & ModalSlice & KeywordSlice;

export const useBoundStore = create<SliceType>()((...a) => ({
  ...createBookIdSlice(...a),
  ...createModalSlice(...a),
  ...createKeywordSlice(...a),
}));
