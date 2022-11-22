const username = 'myuser';
const password = 'password';
const host = 'localhost';
const port = '27017';
const dbname = 'db-nasa';

const mongoUrl = `mongodb://${username}:${password}@${host}:${port}/${dbname}`;

module.exports = {
  mongoUrl,
}
