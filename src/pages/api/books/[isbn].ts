import { NBookResponse } from '@/types/book';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const axiosInstance = axios.create({
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID || '',
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET || '',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { isbn } = req.query;

  try {
    const response = await axiosInstance.get<NBookResponse>(
      process.env.NAVER_BOOK_INFO_API_ENDPOINT || '',
      {
        params: { d_isbn: isbn },
      }
    );
    return res.status(200).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return res.status(err.response.status).json(err.response.data);
      }
    }

    return res.status(500).json({ message: '에러 발생' });
  }
}
