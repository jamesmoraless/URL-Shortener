const Pool = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  host:"localhost",
  database:"urlshortener",
  password:"Williamandoraul1$",
  port: 5433,
});

module.exports = pool;