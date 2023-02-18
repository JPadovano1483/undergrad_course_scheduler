// import userCtrlCheck from "./utils.js";
// require('newrelic');

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const Mailjet = require('node-mailjet');
const path = require('path');

app.use(cors());
app.use(express.json());

// cleardb in heroku
const db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "ba47d98a7b19bc",
  password: "f4d6ec6d",
  database: "heroku_a19411dd68d921e"
});

const userCtrlCheck = (reqUser, targetUser, role) => {
  let checker = false;
  if (role == 1 || reqUser == targetUser) checker = true;
  return checker;
}

app.post("/course", (req, res) => {
  const courseId = req.body.courseId;
  const courseName = req.body.courseName;
  const courseDescription = req.body.courseDescription;
  const credits = req.body.credits;
  db.query("INSERT INTO course (course_id, course_name, course_description, credit_num) VALUES (?,?,?,?)",
    [courseId, courseName, courseDescription, credits],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/allCourses", (req, res) => {
  db.query("SELECT * FROM course",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/adminCourses", (req, res) => {
  db.query("SELECT * FROM course LEFT JOIN course_schedule using (course_id)",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/prereq", (req, res) => {
  const course_id = req.body.id;
  const sem = [req.body.sem1, req.body.sem2, req.body.sem3, req.body.sem4, req.body.sem5, req.body.sem6, req.body.sem7];
  db.query("SELECT prerequisite_id FROM prerequisite WHERE course_id = ?",
    [course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < sem.length; j++) {
            if (result[i] == sem[j]) {
              res.send(false);
            }
          }
        }
      }
      else {
        console.log("No prerequisites.");
        res.send(true);
      }
    });
});

app.post("/email", (req, res) => {
  const email = req.body.email;

  const client = Mailjet
    .apiConnect('a4d0148c05371f7107bdd333b86d9797', '3d1fb5bf7ab1b63f9c889840f053e513')

  client
    .post('send', {'version': 'v3.1'})
    .request({ "Messages":[
      {
      "From": {
          "Email": "andrewcoldsmith@gmail.com"
      },
      "To": [
          {
          "Email": email
          }
      ],
      "Subject": "Password Reset",
      "HTMLPart": `<h4>To reset your password, click <a href='http://localhost:3000/reset?email=${email}'>here</a>.</h4>`,
      }
    ]
  })
  .then(response => {
      console.log('response => ', response.body)
  })
  .catch(err => {
      console.log('error => ', err)
  })
});

// trying to get server started with app
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, '../src/build')));
app.get('/api', (req, res) => {
  res.json({
    message: 'This is the api endpoint'
  })
})


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE username = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send(result);
      }
      else {
        res.send("Username or password is incorrect.");
      }
    });
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confPassword = req.body.confPassword;

  if (password == confPassword) {
    db.query("INSERT INTO user (username, password) VALUES (?,?)",
      [email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  }
  else {
    res.send("Passwords do not match.");
  }
});

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM course",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM user",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/account", (req, res) => {
  const major = req.body.major;
  const concentration = req.body.concentration;
  const minor = req.body.minor;

  db.query("UPDATE user SET major_name = ?, concentration_name = ?, minor_name = ? WHERE username = ?",
    [major, concentration, minor, 'jamie_padovano'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/profile",(req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  //const grade_level = req.body.grade_level;

  db.query("SELECT first_name, last_name, username, grade_level FROM user WHERE username = ?",
  'jamie_padovano',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
    });
  
});

app.get("/accountInfo",(req, res) => {
  db.query("SELECT * FROM user WHERE username = ?",
  'jamie_padovano',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
    });
  
});

app.get("/plan/:id", (req, res) => {
  const user_id = req.params.id;
  const reqUser = req.body.reqUser;
  const targetUser = req.body.targetUser;
  const role = req.body.role;

  let userValidation = userCtrlCheck(reqUser, targetUser, role);

  if (userValidation) {
    db.query(`SELECT semester_id, course_id, course_name, credit_num FROM user JOIN semester using(user_id) JOIN user_course using(semester_id) JOIN course using(course_id) WHERE user.user_id=?`,
      user_id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  }
  else {
    console.log("Not Authorized");
  }
});

app.get("/semester/:id", (req, res) => {
  const semester_id = req.params.id;
  const reqUser = req.body.reqUser;
  const targetUser = req.body.targetUser;
  const role = req.body.role;

  let userValidation = userCtrlCheck(reqUser, targetUser, role);

  if (userValidation) {
    db.query(`SELECT course_id, course_name, credit_num, semester_id FROM user JOIN semester using(user_id) JOIN user_course using(semester_id) JOIN course using(course_id) WHERE semester_id=?`,
      semester_id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  }
  else {
    console.log("Not Authorized");
  }
});

app.post("/reset", (req, res) => {
  const password = req.body.password;
  const confPassword = req.body.confPassword;
  const email = req.body.email;
    if (password == confPassword) {
      db.query(`UPDATE user SET password = ? WHERE username = ?`,
        [password, email],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Password changed.");
            res.send(result);
          }
        });
    }
    else {
      console.log("Passwords do not match.");
      res.send("Passwords do not match.");
  }
});

app.post("/addCourse", (req, res) => {
  const semester_id = req.body.semester_id;
  const course_id = req.body.course_id;
  db.query(`INSERT INTO user_course (semester_id, course_id) VALUES (?,?)`,
    [semester_id, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(course_id + '   ' + semester_id);
        res.send(result);
      }
    });
});

app.post("/deleteCourse", (req, res) => {
  const semester_id = req.body.semester_id;
  const course_id = req.body.course_id;
  db.query(`DELETE FROM user_course WHERE semester_id=? AND course_id=?`,
    [semester_id, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../src/build/index.html'));
});

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});