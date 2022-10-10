const express = require('express');
const cors = require('cors');
const app = express();

const { getBooks, getBook } = require('./controller/book');

require('dotenv').config();

app.use(cors());

app.get('/books', getBooks);
app.get('/book/:id', getBook);

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
