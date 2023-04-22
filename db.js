const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

/*const pool = new Pool({
  user:"postgres",
  host:"localhost",
  database:"urlshortener",
  password:"Williamandoraul1$",
  port: 5433,
});*/

const pool = new Pool({ connectionString: process.env.DATABASE_URL});

module.exports = pool;