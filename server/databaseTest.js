//   const { createPool } = require('mysql');



//   const pool = createPool({
//     host: "us-cdbr-east-06.cleardb.net",
//     user: "ba47d98a7b19bc",
//     password: "f4d6ec6d",
//   });

// let query = 'select course.course_id, course.course_name, course.credits from heroku_a19411dd68d921e.semester_course join course on course.course_id=semester_course.course_id';

//   pool.query(`SELECT course_id FROM heroku_a19411dd68d921e.semester_course JOIN course using course_id`, (err, res) => {
//     return res.forEach(element => {
//       console.log(element);
//     });
//   });

const db = require("./server");

db.query('SELECT course_id, course_name, credits FROM heroku_a19411dd68d921e.course join heroku_a19411dd68d921e.semester_course using(course_id) join heroku_a19411dd68d921e.semester using(semester_id) join heroku_a19411dd68d921e.plan using(plan_id) join heroku_a19411dd68d921e.user using(user_id) where plan_id=1;', (err, res) => {
  return res.forEach(element => {
    console.log(element);
  });
});
