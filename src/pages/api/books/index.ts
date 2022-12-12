import { NBookResponse } from '@/types/book';
import { axiosServerInstance } from 'api/utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const response = await axiosServerInstance.get<NBookResponse>(
      process.env.NAVER_BOOK_LIST_API_ENDPOINT || '',
      {
        params: { query },
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
