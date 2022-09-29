// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'us-cdbr-east-06.cleardb.net',
//   user: 'ba47d98a7b19bc',
//   password: 'f4d6ec6d'
// });

// module.exports = db;



const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   user: "ba47d98a7b19bc",
//   host: "us-cdbr-east-06.cleardb.net",
//   password: "f4d6ec6d",
//   database: "heroku_a19411dd68d921e",
// });

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "ceaQwa!!",
  database: "ugrad_scheduler",
});


app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});