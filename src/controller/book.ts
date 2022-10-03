import { IBookResponse } from '../types/book';
import { axiosInstance } from '../utils/common';

export const getBook = async (id?: string | string[]) => {
  return axiosInstance.get<IBookResponse>(`/book/${id}3`).then((res) => res.data.items);
};
