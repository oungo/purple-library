const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./modules/index');
const { getBooks, getBook } = require('./controller/book');

require('dotenv').config();

app.use(cors());

app.get('/books', getBooks);
app.get('/book/:id', getBook);

db.sequelize
  .sync({ force: false }) // 서버 실행시마다 테이블을 재생성할건지에 대한 여부
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
