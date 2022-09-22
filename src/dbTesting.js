const { createPool } = require('mysql');

const pool = createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "ba47d98a7b19bc",
  password: "f4d6ec6d",
});

pool.query(`SELECT course_name FROM heroku_a19411dd68d921e.course`, (err, res) => {
  return res.forEach(element => {
    console.log(element.course_id);
  });
});
