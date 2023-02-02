const Pool = require("pg").Pool;

const pool = new Pool({
  user: "tommy",
  password: "appledose123",
  host: "localhost",
  port: 5432,
  database: "planner",
});

module.exports = pool;
