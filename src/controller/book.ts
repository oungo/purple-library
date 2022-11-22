import { NBookResponse } from '@/types/book';
import { axiosInstance } from '@/utils/common';

export const getNBook = async (isbn: string) => {
  return axiosInstance.get<NBookResponse>(`/api/books/${isbn}`).then((res) => res.data);
};

export const getNBooks = async (keyword: string) => {
  return axiosInstance
    .get<NBookResponse>('/api/books', {
      params: { query: keyword },
    })
    .then((response) => response.data.items);
};
