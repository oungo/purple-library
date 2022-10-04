const axios = require('axios').default;

const getBooks = async (req, res) => {
  const { query } = req.query;

  const response = await axios
    .get(process.env.NAVER_BOOK_LIST_API_ENDPOINT, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
      params: { query },
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        return res.status(error.response.status).json({ success: false });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  return res.status(200).json(response.data);
};

const getBook = async (req, res) => {
  const { id } = req.params;

  const response = await axios
    .get(process.env.NAVER_BOOK_INFO_API_ENDPOINT, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
      params: { d_isbn: id },
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        return res.status(error.response.status).json({ success: false });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  return res.status(200).json(response.data);
};

module.exports = {
  getBooks,
  getBook,
};
