const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig = require("../knexfile");

module.exports = knex(dbConfig[ENV]);
