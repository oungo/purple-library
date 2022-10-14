import { NBookResponse } from '@/types/book';
import { axiosInstance } from '@/utils/common';

export const getBook = async (id?: string | string[]) => {
  return axiosInstance.get<NBookResponse>(`/book/${id}`).then((res) => res.data);
};

export const getBooks = async (keyword: string) => {
  return axiosInstance
    .get<NBookResponse>('/books', {
      params: { query: keyword },
    })
    .then((response) => response.data.items);
};
