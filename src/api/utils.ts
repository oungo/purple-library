import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const axiosServerInstance = axios.create({
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID || '',
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET || '',
  },
});
