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

//cleardb in heroku
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
  const semester = req.body.semester;
  const year = req.body.year;
  db.query("INSERT INTO course (course_id, course_name, course_description, credit_num, semester, year) VALUES (?,?,?,?,?,?)",
    [courseId, courseName, courseDescription, credits, semester, year],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});
app.post("/program", (req, res) => {
  const programName = req.body.programName;
  const programType = req.body.programType;
  const concentrationReq = req.body.concentrationReq;
  db.query("INSERT INTO program (program_name, program_type, concentration_req) VALUES (?,?,?)",
    [programName, programType, concentrationReq],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});
app.post("/courseEdit", (req, res) => {
  const courseId = req.body.courseId;
  const courseName = req.body.courseName;
  const courseDescription = req.body.courseDescription;
  const credits = req.body.credits;
  const semester = req.body.semester;
  const year = req.body.year;

  db.query("DELETE FROM course WHERE course_id = ?",
    [courseId],)

  db.query("INSERT INTO course (course_id, course_name, course_description, credit_num, semester, year) VALUES (?,?,?,?,?,?)",
    [courseId, courseName, courseDescription, credits, semester, year],
    (err, result) => {
      if (err) {
        res.send(err);
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

app.get("/allPrograms", (req, res) => {
  db.query("SELECT * FROM program",
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

app.post("/prereq", (req, res) => {
  const semsterId = req.body.semesterId;
  const courseId = req.body.courseId;
  console.log("semsterId " + semsterId);
  console.log("courseId " + courseId);
  db.query("SELECT prerequisite_id, grade_req FROM prerequisite WHERE course_id = ?",
    [courseId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    });
});

app.post("/resetCode", (req, res) => {
  const code = req.body.code;
  const email = req.body.email;
  db.query("UPDATE user SET reset_code = ? WHERE username = ?",
    [code, email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    });
});

app.post("/email", (req, res) => {
  const code = req.body.code;
  const email = req.body.email;

  const client = Mailjet
    .apiConnect('a4d0148c05371f7107bdd333b86d9797', '3d1fb5bf7ab1b63f9c889840f053e513')

  client
    .post('send', { 'version': 'v3.1' })
    .request({
      "Messages": [
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
          "HTMLPart": `<h4>To reset your password, click <a href='http://localhost:3000/reset?code=${code}'>here</a>.</h4>`,
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
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const grade_level = req.body.grade_level;

  if (password == confPassword) {
    db.query("INSERT INTO user (username, password, first_name, last_name, grade_level) VALUES (?,?,?,?,?)",
      [email, password, first_name, last_name, grade_level],
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

// app.post("/userProgram", (req, res) => {
//   const userId = req.body.userId;
  
//   db.query("INSERT INTO user_program (major_name) VALUES ()",
//     [major, userId],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     });
// });

app.post("/getMajors", (req, res) => {
  db.query("SELECT * FROM program WHERE program_type = ?",
    ["major"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/getMinors", (req, res) => {
  db.query("SELECT * FROM program WHERE program_type = ?",
    ["minor"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/getConcentrations", (req, res) => {
  db.query("SELECT * FROM program WHERE program_type = ?",
    ["concentration"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/insertMajor", (req, res) => {
  const userId = req.body.userId;
  const majorId = req.body.majorId;
  
  db.query("INSERT INTO user_program (user_id, program_id) VALUES (?,?)",
    [userId, majorId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/updateMajor", (req, res) => {
  const userId = req.body.userId;
  const majorId = req.body.majorId;

  db.query("UPDATE user_program SET program_id = ? WHERE user_id = ? AND program_id = (SELECT program_id FROM user_program JOIN program using(program_id) WHERE user_id = ? AND program_type = ?)",
    [majorId, userId, userId, "major"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/insertMinor", (req, res) => {
  const userId = req.body.userId;
  const minorId = req.body.majorId;
  
  db.query("INSERT INTO user_program (user_id, program_id) VALUES (?,?)",
    [userId, minorId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/updateMinor", (req, res) => {
  const minor = req.body.minor;
  const userId = req.body.userId;

  db.query("UPDATE user_program SET program_id = ? WHERE user_id = ? AND program_id = (SELECT program_id FROM user_program JOIN program using(program_id) WHERE user_id = ? AND program_type = ?)",
    [minor, userId, userId, "minor"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/insertConcentration", (req, res) => {
  const userId = req.body.userId;
  const concentrationId = req.body.concentrationId;
  
  db.query("INSERT INTO user_program (user_id, program_id) VALUES (?,?)",
    [userId, concentrationId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/updateConcentration", (req, res) => {
  const concentration = req.body.concentration;
  const userId = req.body.userId;

  db.query("UPDATE user_program SET program_id = ? WHERE user_id = ? AND program_id = (SELECT program_id FROM user_program JOIN program using(program_id) WHERE user_id = ? AND program_type = ?)",
    [concentration, userId, userId, "concentration"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/updatePassword", (req, res) => {
  const password = req.body.password;
  const userId = req.body.userId;

  db.query("UPDATE user SET password = ? WHERE user_id = ?",
    [password, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/major", (req, res) => {
  db.query("SELECT program_name FROM program WHERE program_type = ?",
    ['major'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/minor", (req, res) => {
  db.query("SELECT program_name FROM program WHERE program_type = ?",
    ['minor'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });

});

app.post("/concentration/:major", (req, res) => {

  const program = req.params.major;
  db.query("SELECT program_name FROM program WHERE program_type = ? AND major_id IN (SELECT program_id FROM program WHERE program_name = ? AND program_type = ?)",
  ['concentration', program, 'major'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });

});
app.get("/profile", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  //const grade_level = req.body.grade_level;

  db.query("SELECT first_name, last_name, username, grade_level FROM user WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });

});

app.post("/program", (req, res) => {
  const userId = req.body.userId;

  db.query("SELECT * FROM user_program JOIN program using(program_id) WHERE user_id=?",
    userId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
    

// app.get("/accountInfo", (req, res) => {
//   db.query("SELECT * FROM user WHERE username = ?",
//     'jamie_padovano',
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     });

// });

app.get("/plan/:id", (req, res) => {
  const user_id = req.params.id;
  const reqUser = req.body.reqUser;
  const targetUser = req.body.targetUser;
  const role = req.body.role;

  let userValidation = userCtrlCheck(reqUser, targetUser, role);

  if (userValidation) {
    db.query(`SELECT semester_id, course_id, course_name, credit_num FROM user JOIN semester using(user_id) JOIN user_course using(semester_id) JOIN course using(course_id) WHERE user.user_id=?`,
      [userId],
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

app.post("/semester/:id", (req, res) => {
  const semesterId = req.params.id;
  const reqUser = req.body.reqUser;
  const targetUser = req.body.targetUser;
  const role = req.body.role;

  let userValidation = userCtrlCheck(reqUser, targetUser, role);

  if (userValidation) {
    db.query("SELECT course_id, course_name, credit_num, semester_id, user.user_id FROM course JOIN user_course using(course_id) JOIN semester using(semester_id) INNER JOIN user ON user_course.user_id=user.user_id WHERE semester_id=? AND user.user_id=?",
      [semesterId, reqUser],
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

app.post("/allSemesters", (req, res) => {
  const reqUser = req.body.reqUser;
  const targetUser = req.body.targetUser;
  const role = req.body.role;
  const semNumSelected = req.body.semNumSelected
  console.log(semNumSelected);

  let userValidation = userCtrlCheck(reqUser, targetUser, role);

  if (userValidation) {
    db.query("SELECT course_id, course_name, credit_num, semester_id, user.user_id, user_course.grade FROM course JOIN user_course using(course_id) JOIN semester using(semester_id) INNER JOIN user ON user_course.user_id=user.user_id WHERE semester_id < ? AND user.user_id=?",
    [semNumSelected, reqUser],
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

app.post("/semCount", (req, res) => {
  const userId = req.body.userId;
  db.query(`SELECT semester_num FROM semester WHERE user_id=? ORDER BY semester_num DESC LIMIT 1`,
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/reset", (req, res) => {
  const password = req.body.password;
  const confPassword = req.body.confPassword;
  const code = req.body.code;
  db.query(`UPDATE user SET password = ? WHERE reset_code = ?`,
    [password, code],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Password changed.");
        res.send(result);
      }
    });
});

app.post("/deleteCode", (req, res) => {
  const code = req.body.code;
  db.query("UPDATE user SET reset_code = ? WHERE reset_code = ?",
    [null, code],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    });
});

app.post("/addCourse", (req, res) => {
  const semester_id = req.body.semester_id;
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  db.query(`INSERT INTO user_course (semester_id, course_id, user_id) VALUES (?,?,?)`,
    [semester_id, course_id, user_id],
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
});

app.post("/addSemester", (req, res) => {
  const user_id = req.body.user_id;
  const semester_num = req.body.semester_num;
  db.query(`INSERT INTO semester (user_id, semester_num) VALUES (?,?)`,
    [user_id, semester_num],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
});

app.post("/deleteSemester", (req, res) => {
  const user_id = req.body.user_id;
  const semester_num = req.body.semester_num;
  // db.query(`DELETE FROM semester WHERE user_id=? ORDER BY semester_num DESC LIMIT 1`,
  db.query(`DELETE FROM semester WHERE user_id=? AND semester_num=?`,
    [user_id, semester_num],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
});
app.post("/userRequirements", (req, res) => {
  const user_id = req.body.user_id;
  db.query(`SELECT req_id, req_type, req_type_num, course_id, course_name, course_description, credit_num FROM user
  JOIN user_program using (user_id)
  JOIN program using (program_id)
  JOIN requirement using (program_id)
  JOIN requirement_course using (req_id)
  join course using (course_id)
  WHERE user.user_id=?
  ORDER BY req_id ASC`,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    }
  );
});

app.post("/allUserCourses", (req, res) => {
  const user_id = req.body.user_id;
  db.query(`SELECT course_id, grade, semester_id, semester, course.year FROM user_course JOIN course using (course_id) WHERE user_id=? ORDER BY semester_id;`,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    }
  );
});

app.post("/userSemeseterIDs", (req, res) => {
  const user_id = req.body.user_id;
  db.query(`SELECT semester_id FROM semester WHERE user_id=? ORDER BY semester_id`,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    }
  );
})

app.post("/searchCourse", (req, res) => {
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;
  db.query(`SELECT * FROM course WHERE course_name=? OR course_id=?`,
    [course_name, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    }
  );
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../src/build/index.html'));
});

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});

setInterval(function () {
  db.query('SELECT 1');
}, 5000);