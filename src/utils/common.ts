import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const PAGE_SIZE = 15;
export const BOOK_MODAL_ID = 'bookModal';
export const USER_MODAL_ID = 'userModal';

export const getBookStatus = (inStock?: boolean) => {
  return inStock ? '보유중' : '구매 예정';
};
