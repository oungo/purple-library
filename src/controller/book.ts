import { IBookResponse } from '@/types/book';
import { axiosInstance } from '@/utils/common';

export const getBook = async (id?: string | string[]) => {
  return axiosInstance.get<IBookResponse>(`/book/${id}`).then((res) => res.data);
};

export const getBooks = async (keyword: string) => {
  return axiosInstance
    .get<IBookResponse>('/books', {
      params: { query: keyword },
    })
    .then((response) => response.data.items);
};
