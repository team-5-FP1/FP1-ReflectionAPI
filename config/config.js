require("dotenv").config();

const {Pool} = require("pg");

const config = new Pool({
  user: "postgres",
  host: "localhost",
  database: "reflection",
  password: "postgres",
  port: 5432
});

module.exports = config;
