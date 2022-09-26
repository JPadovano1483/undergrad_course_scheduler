const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'ba47d98a7b19bc',
  password: 'f4d6ec6d'
});

module.exports = db;