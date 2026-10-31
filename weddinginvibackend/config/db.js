const { Pool } = require("pg");
require("dotenv").config();

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);

  console.log("DB host:", dbUrl.hostname);
  console.log("DB port:", dbUrl.port);
  console.log("DB username:", dbUrl.username);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
});

module.exports = pool;