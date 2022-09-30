module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '0Qorentks!', // mysql 초기 설정한 비밀번호
  DB: 'book',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
