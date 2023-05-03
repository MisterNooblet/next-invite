import mysql from 'mysql2/promise';

const environment = process.env.NODE_ENV;
console.log(environment);
const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

export default db;
