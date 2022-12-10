import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const PAGE_SIZE = 15;
export const BOOK_MODAL_ID = 'bookModal';
export const USER_MODAL_ID = 'userModal';

export const filterQuery = (query: ParsedUrlQuery) => {
  return Object.fromEntries(Object.entries(query).filter(([_, value]) => value));
};
