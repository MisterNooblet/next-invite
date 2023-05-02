import mysql from 'mysql2';

const environment = process.env.NODE_ENV;

const db = mysql.createConnection({
  host: environment !== 'development' ? process.env.SQL_HOST : 'localhost',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

export default db;
