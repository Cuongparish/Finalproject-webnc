const { Pool } = require("pg");

require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

// Cua cuong
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "final",
  password: "123456",
  port: 5432,
});

// Cua tien
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "webnc",
//   password: "713112411",
//   port: 5432,
// });

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;
