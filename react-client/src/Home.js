import './css/home.css';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableBody, TableRow, IconButton, Drawer, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Navigation from './navigation';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SimpleDialog from './Dialog';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import SearchCourse from "./SearchCourse";
import Tooltip from '@mui/material/Tooltip';


function Home() {
    let accountInfo = {};
    if (localStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else if (sessionStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else {
        window.location.href = "http://localhost:3000";
    }
    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [semTotal, setSemTotal] = useState(0);
    const getSemTotal = () => {
        Axios.post(`http://localhost:3001/semCount`, {
            userId: accountInfo.user_id
        }).then((response) => {
            if (response.data[0] !== undefined) {
                setSemTotal(response.data[0].semester_num);
            }
            else {
                setSemTotal(0);
            }
        });
    }
    useEffect(() => {
        getSemTotal();
    }, []);

    // requirement checking 
    const [requirements, setRequirements] = useState([]);
    const getUserRequirements = () => {
        Axios.post(`http://localhost:3001/userRequirements`, {
            user_id: accountInfo.user_id
        }).then((response) => {
            setRequirements(response.data);
        });
    }
    useEffect(() => {
        getUserRequirements();
    }, []);

    const handleRequirements = (requirements) => {
        let newRequirements = [];
        let currId = null;
        let arrayToPush = [];
        requirements.forEach((element, index) => {
            if (index != 0) {
                if (element.req_id == currId) {
                    arrayToPush.push(element);
                }
                else {
                    newRequirements.push(arrayToPush);
                    arrayToPush = [];
                    arrayToPush.push(element);
                    currId = element.req_id;
                }
            }
            else {
                currId = element.req_id;
                arrayToPush.push(element);
            }
        });
        if (newRequirements.length != 0) setRequirements(newRequirements);
    }

    if (requirements.length != 0) {
        handleRequirements(requirements);
    }

    const [userCourses, setUserCourses] = useState([]);
    const getUserCourses = (user_id) => {
        Axios.post(`http://localhost:3001/allUserCourses`, {
            user_id: user_id
        }).then((response) => {
            setUserCourses(response.data);
        });
    }
    useEffect(() => {
        getUserCourses(accountInfo.user_id);
    }, []);

    const [semNumSelected, setSemNumSelected] = useState(0);
    const [dialogRow, setDialogRow] = useState({});

    const handleDialogOpen = (row) => {
        setDialogRow(courseList.find(elem => elem.course_id === row.course_id));
        setDialogOpen(true);
    };

    const handleClose = (value) => {
        setDialogOpen(false);
    };

    const drawerWidth = 350;

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        if (selectedSemester != "") setSelectedSemester("");
    }

    // could try to get all courses and filter down by semester_id
    const [sem1, setSem1] = useState([]);
    const [sem2, setSem2] = useState([]);
    const [sem3, setSem3] = useState([]);
    const [sem4, setSem4] = useState([]);
    const [sem5, setSem5] = useState([]);
    const [sem6, setSem6] = useState([]);
    const [sem7, setSem7] = useState([]);
    const [sem8, setSem8] = useState([]);
    const [sem9, setSem9] = useState([]);
    const [sem10, setSem10] = useState([]);
    const [sem11, setSem11] = useState([]);
    const [sem12, setSem12] = useState([]);

    const getSemester = (setSem, id) => {
        Axios.post(`http://localhost:3001/semester/${id}`, {
            reqUser: accountInfo.user_id,
            targetUser: accountInfo.user_id,
            role: accountInfo.is_admin
        }).then((response) => {
            setSem(response.data);
        });
    }
    useEffect(() => {
        getSemester(setSem1, 1);
    }, []);
    useEffect(() => {
        getSemester(setSem2, 2);
    }, []);
    useEffect(() => {
        getSemester(setSem3, 3);
    }, []);
    useEffect(() => {
        getSemester(setSem4, 4);
    }, []);
    useEffect(() => {
        getSemester(setSem5, 5);
    }, []);
    useEffect(() => {
        getSemester(setSem6, 6);
    }, []);
    useEffect(() => {
        getSemester(setSem7, 7);
    }, []);
    useEffect(() => {
        getSemester(setSem8, 8);
    }, []);
    useEffect(() => {
        getSemester(setSem9, 9);
    }, []);
    useEffect(() => {
        getSemester(setSem10, 10);
    }, []);
    useEffect(() => {
        getSemester(setSem11, 11);
    }, []);
    useEffect(() => {
        getSemester(setSem12, 12);
    }, []);

    const [courseList, setCourseList] = useState([]);
    const getCourses = (set) => {
        Axios.get(`http://localhost:3001/allCourses`).then((response) => {
            setCourseList(response.data);
        });
    }
    useEffect(() => {
        getCourses();
    }, []);

    // filter course search
    let [filteredCourses, setFilteredCourses] = useState([]);

    const handleCourseSearch = () => {
        let idInput = document.getElementById('course_id_input')?.value;

        return SearchCourse(courseList, idInput);
    }
    const [open, setOpen] = useState(false);
    const [gradeRow, setGradeRow] = useState({});
    const handleClickOpen = (row) => {
        setGradeRow(row);
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleClickConfirm = (index) => {
        setOpen(false);
    }

    const [grade, setGrade] = useState("A");
    const insertGrade = (course) => {
        console.log("grade: " + grade);
        Axios.post(`http://localhost:3001/insertGrade`, {
            grade: grade,
            user_id: accountInfo.user_id,
            semester_id: course.semester_id,
            course_id: course.course_id
        }).then((response) => {
            console.log(response);
        });
    }



    const handleDeleteCourse = (course, semester) => {
        Axios.post(`http://localhost:3001/deleteCourse`, {
            semester_id: course.semester_id,
            course_id: course.course_id
        }).then((response) => {
            console.log(response);
            getSemester(eval('setSem' + course.semester_id), course.semester_id);
            getUserCourses(accountInfo.user_id);
        });
    }

    const handleAddSemester = () => {
        Axios.post(`http://localhost:3001/addSemester`, {
            user_id: accountInfo.user_id,
            semester_num: semTotal + 1
        }).then((response) => {
            console.log(response);
        });
        setSemTotal(semTotal + 1);
    }

    const handleDeleteSemester = () => {
        Axios.post(`http://localhost:3001/deleteSemester`, {
            user_id: accountInfo.user_id,
            semester_num: semTotal
        }).then((response) => {
            console.log(response);
        });
        setSemTotal(semTotal - 1);
    }

    const creditWarningPopup = (creditId, creditNum) => {
        if (creditNum < 12 || creditNum > 18) {
            return (
                <Tooltip title="You must have 12-18 credits per semester. Please contact your advisor if you plan to underload/overload a semester." placement="top" arrow>
                    <Typography
                        id={creditId}
                        sx={{ color: 'red' }}
                    >
                        Credits: {creditNum}
                    </Typography>
                </Tooltip>

            );
        }
        else {
            return (
                <div>
                    <Typography
                        id={creditId}
                    >
                        Credits: {creditNum}
                    </Typography>
                </div>
            )
        }
    }

    const semesterBlocks = (semTotal, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10, sem11, sem12) => {
        const semesters = [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10, sem11, sem12];
        let blocks = [];
        let numbers = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];

        const countCredits = (semester, id) => {
            let count = 0;
            for (const course of semester) {
                count += course.credit_num;
            }

            creditWarning(id, count);

            return count;
        }

        const creditWarning = (elementId, creditCount) => {
            let element = document.querySelector(`#${elementId}`);
            if (element != null) {
                if (creditCount < 12 || creditCount > 18) {
                    element.style.color = 'red';
                }
                else {
                    element.style.color = 'black';
                }
            }
        }

        for (let i = 0; i < semTotal; i++) {
            let creditId = 'credit_count' + i;
            let creditCount = countCredits(semesters[i], creditId);
            blocks.push(<Grid item={true} xs={6} className='tableGrid'>
                <h2>{numbers[i]} Semester</h2>
                {/* <h4 id={creditId}>Credits: {countCredits(element, creditId)}</h4> */}
                {creditWarningPopup(creditId, creditCount)}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {semesters[i].map((row) => (
                                <TableRow key={row?.id}>
                                    <TableCell sx={{ width: "10%" }}>{row?.course_id}</TableCell>
                                    <TableCell sx={{ width: "50%" }} onClick={() => { handleDialogOpen(row) }}>{row?.course_name}</TableCell>
                                    <TableCell sx={{ width: "10%" }}>{row?.credit_num}</TableCell>
                                    <TableCell sx={{ width: "10%" }}>
                                        <Button color="error" onClick={() => handleDeleteCourse(row, semesters[i])}>
                                            <DeleteIcon></DeleteIcon>
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ width: "10%" }}>
                                        <Button onClick={() => handleClickOpen(row)}>
                                            <Checkbox id='check'
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }}
                                            />
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Completed Course Grade</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Please enter the grade for the completed Course
                                                </DialogContentText>
                                                <select className="dropdownSem" onChange={(e) => {
                                                    setGrade(e.target.value)
                                                }}>
                                                    <option value="A">A</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B">B</option>
                                                    <option value="B-">B-</option>
                                                    <option value="C+">C+</option>
                                                    <option value="C">C</option>
                                                    <option value="C-">C-</option>
                                                    <option value="D+">D+</option>
                                                    <option value="D">D</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClickClose}>Cancel</Button>
                                                <Button onClick={() => { insertGrade(gradeRow); handleClickClose() }}>Submit</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell sx={{ width: "10%", borderTop: "1px solid rgba(224,224,224,1)" }}>
                                        {checkFlag(row.error_code)}
                                    </TableCell>
                                    <SimpleDialog
                                        open={dialogOpen}
                                        onClose={handleClose}
                                        row={dialogRow}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={() => addToSemester(semesters[i], i + 1)}>Add</Button>
            </Grid>);
        }
        return blocks;
    }

    const [selectedSemester, setSelectedSemester] = useState("");

    const addToSemester = (semester, semesterNum) => {
        setSelectedSemester(semester);
        setSemNumSelected(semesterNum);
        setDrawerOpen(true);
    }

    const addCourse = (course) => {
        if (selectedSemester !== "") {
            let courseInPlan = userCourses?.find(element => element.course_id == course.course_id);
            if (!courseInPlan) {
                Promise.all([
                    Axios.post(`http://localhost:3001/prereq`, {
                        semesterId: semNumSelected,
                        courseId: course.course_id,
                    }),
                    Axios.post(`http://localhost:3001/allSemesters`, {
                        reqUser: accountInfo.user_id,
                        targetUser: accountInfo.user_id,
                        role: accountInfo.is_admin,
                        semNumSelected: semNumSelected
                    })
                ]).then((response) => {
                    let satisfied = true;
                    if (response[0].data.length > 0) {
                        const grades = ["F", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
                        // checks if the perequisite courses are found in a previous semester and have a passing grade or have no grade yet
                        for (let i = 0; i < response[0].data.length; i++) {
                            const classPassed = response[1].data.some((course) => {
                                return course.course_id == response[0].data[i].prerequisite_id && (course.grade === null || grades.findIndex(element => element == course.grade) >= grades.findIndex(element => element == response[0].data[i].grade_req));
                            });

                            if (!classPassed) {
                                satisfied = false;
                            }
                        }
                    }

                    let errorCode = getErrorCode(course, semNumSelected, satisfied);

                    // push the course to the semester
                    selectedSemester.push(course);
                    Axios.post(`http://localhost:3001/addCourse`, {
                        semester_id: semNumSelected,
                        course_id: course.course_id,
                        user_id: accountInfo.user_id,
                        error_code: errorCode
                    }).then((response) => {
                        console.log(response);
                        getSemester(eval('setSem' + semNumSelected), semNumSelected);
                        getUserCourses(accountInfo.user_id);
                    });
                });


            }
            else {
                console.log("Course already planned!");
            }
        }
    }

    const getErrorCode = (course, semId, satisfied) => {
        let isStartSemEven = accountInfo?.start_year % 2 == 0;
        let isSemEven = false;
        let semFlag = false;
        let yearFlag = false;
        let prereqFlag = !satisfied;
        let errorCode = 0;

        // mark all flags as true or false
        if (userSemIDs.length != 0 && course) {
            // check semester placement
            if ((course.semester?.toLowerCase() == "fall" && userSemIDs.indexOf(semId) % 2 == 1) || (course.semester?.toLowerCase() == "spring" && userSemIDs.indexOf(semId) % 2 == 0)) {
                semFlag = true;
            }

            // flip bit for every spring semester
            let sameAsFirstSem = [0, 3, 4, 7, 8, 11, 12];
            if (sameAsFirstSem.includes(userSemIDs.indexOf(semId))) isSemEven = isStartSemEven;
            else isSemEven = !isStartSemEven;

            // check year placement
            if ((course.year?.toLowerCase() == "even" && !isSemEven) || (course.year?.toLowerCase() == "odd" && isSemEven)) {
                yearFlag = true;
            }
        }

        // set error code and return
        if (semFlag) {
            if (yearFlag && prereqFlag) errorCode = 7;
            else if (yearFlag) errorCode = 4;
            else if (prereqFlag) errorCode = 5;
            else errorCode = 1;
        }
        else if (yearFlag) {
            if (prereqFlag) errorCode = 6;
            else errorCode = 2;
        }
        else if (prereqFlag) {
            errorCode = 3;
        }
        else {
            errorCode = 0;
        }

        return errorCode;
    }

    const [userSemIDs, setUserSemIDs] = useState([]);

    const getUserSemIDs = () => {
        Axios.post(`http://localhost:3001/userSemesterIDs`, {
            user_id: accountInfo.user_id
        }).then((response) => {
            for (const elem of response.data) {
                if (!userSemIDs.includes(elem.semester_id)) userSemIDs.push(elem.semester_id);
            }
        });
    }

    useEffect(() => {
        getUserSemIDs();
    }, []);

    const checkFlag = (errorCode) => {
        let errorMessage = '';

        switch (errorCode) {
            case 0:
                errorMessage = '';
                break;
            case 1:
                errorMessage = 'Wrong Semester!';
                break;
            case 2:
                errorMessage = 'Wrong Year!';
                break;
            case 3:
                errorMessage = 'Prerequisites Not Met!';
                break;
            case 4:
                errorMessage = 'Wrong Semester! Wrong Year!';
                break;
            case 5:
                errorMessage = 'Wrong Semester! Prerequisites not Met!';
                break;
            case 6:
                errorMessage = 'Wrong Year! Prerequisites Not Met!';
                break;
            case 7:
                errorMessage = 'Wrong year! Wrong Semester! Prereq issue!';
                break;
            default:
                errorMessage = '';
                break;
        }


        if (errorMessage !== '') {
            return (
                <Tooltip title={errorMessage} placement="top" arrow>
                    <ErrorIcon sx={{ color: 'red' }} />
                </Tooltip>
            );
        }
    }

    return (
        <div className="App">
            <Navigation />
            <div className='contentContainer'>
                <IconButton onClick={() => setDrawerOpen(true)}>
                    <ArrowDropDownCircleIcon sx={{
                        color: 'rgba(128, 128, 128, .9)', width: 50, height: 'auto', position: 'fixed',
                        top: 400, right: -10, transform: 'rotate(90deg)'
                    }}></ArrowDropDownCircleIcon>
                </IconButton>
                <Drawer sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        padding: 2,
                        alignItems: 'center',
                        backgroundColor: '#F8F8FF'
                    },
                }} open={drawerOpen} anchor={"right"} onClose={() => handleDrawerClose()}>
                    <h1>All Courses</h1>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="course_id_input"
                                label="Course ID or Name"
                            />
                        </div>
                        <div>
                            <Button
                                onClick={() => setFilteredCourses(handleCourseSearch())}
                            >
                                Search
                            </Button>
                        </div>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {filteredCourses.map((row) => (
                                    <TableRow key={row.id} onClick={() => addCourse(row)} style={{
                                        cursor: 'pointer'
                                    }}>
                                        <TableCell>{row.course_id}</TableCell>
                                        <TableCell>{row.course_name}</TableCell>
                                        <TableCell>{row.credit_num}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Drawer>
                <h1>{semTotal} Semester Plan</h1>
                <Grid container spacing={0}>
                    {semesterBlocks(semTotal, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10, sem11, sem12)}
                </Grid>
                <div>
                    <Button onClick={() => handleAddSemester()}>Add One Semester</Button>
                </div>
                <div>
                    <Button onClick={() => handleDeleteSemester()}>Remove One Semester</Button>
                </div>
            </div>
        </div >
    );
}

export default Home;
