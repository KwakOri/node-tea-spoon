const { Client } = require("pg");

const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect();

module.exports = db;
