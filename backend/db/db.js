const Pool = require("pg").Pool
const pool = new Pool({user: "doit_admin", password: "test123", host: "localhost", port: 5432, database: "doit_db"})
module.exports = pool
