const axios = require('axios').default;

const getBooks = async (req, res) => {
  const response = await axios
    .get(process.env.NAVER_BOOK_API + '?query=micro', {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  console.log(1, response);
  return res.status(200).json(response.data);
};

module.exports = {
  getBooks,
};
