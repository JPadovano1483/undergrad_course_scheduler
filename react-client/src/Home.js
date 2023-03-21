import './css/home.css';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableBody, TableRow, IconButton, Drawer, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import Navigation from './navigation';
import Draggable from 'react-draggable';
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

function Home() {
    const user_id = window.sessionStorage.getItem("user_id");
    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [accountInfo, setAccountInfo] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser != null) {
            loggedInUser = JSON.parse(loggedInUser);
            return loggedInUser;
        }
        else {
            window.location.href = "http://localhost:3000";
        }
    });

    const [semNum, setSemNum] = useState(0);
    const getSemNum = () => {
        Axios.post(`http://localhost:3001/semCount`, {
            userId: accountInfo.user_id
        }).then((response) => {
            if (response.data[0] !== undefined) {
                setSemNum(response.data[0].semester_num);
            }
            else {
                setSemNum(0);
            }
        });
    }
    useEffect(() => {
        getSemNum();
    }, []);

    const getaccountInfo = () => {
        Axios.get(`http://localhost:3001/accountInfo`).then((response) => {
            setAccountInfo(response.data);
        });
    }
    useEffect(() => {
        getaccountInfo();
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
        if(newRequirements.length != 0) setRequirements(newRequirements);
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

    console.log(userCourses);

    const handleDialogOpen = () => {
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
    let filterCourses = (criteria, input, list) => {
        switch (criteria) {
            case "id":
                return list.filter(course =>
                    course.course_id.includes(input)
                );

            case "name":
                return list.filter(course =>
                    course.course_name.includes(input)
                );

            default:
                return list;
        }
    }

    const handleCourseSearch = () => {
        let idInput = document.getElementById('course_id_input')?.value;
        let nameInput = document.getElementById('course_name_input')?.value

        if (nameInput) {
            return filterCourses("name", nameInput, courseList);
        }
        else if (idInput) {
            return filterCourses("id", idInput, courseList);
        }
        else {
            return filterCourses("default", "none", courseList);
        }
    }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleClickConfirm = (index) => {
        console.log(index);
        setOpen(false);
    }

    const handleDeleteCourse = (course, semester) => {
        Axios.post(`http://localhost:3001/deleteCourse`, {
            semester_id: course.semester_id,
            course_id: course.course_id
        }).then((response) => {
            console.log(response);
        });
    }

    const handleAddSemester = () => {
        Axios.post(`http://localhost:3001/addSemester`, {
            user_id: accountInfo[0].user_id,
            semester_num: semNum + 1
        }).then((response) => {
            console.log(response);
            setSemNum(semNum + 1);
        });
    }

    const handleDeleteSemester = () => {
        Axios.post(`http://localhost:3001/deleteSemester`, {
            user_id: accountInfo[0].user_id,
            semester_num: semNum
        }).then((response) => {
            console.log(response);
        });
        setSemNum(semNum - 1);
    }

    // credit popup
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopup = Boolean(anchorEl);

    const creditWarningPopup = (creditId, creditNum) => {
        if (creditNum < 12 || creditNum > 18) {
            return (
                <div>
                    <Typography
                        id={creditId}
                        aria-owns={openPopup ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        Credits: {creditNum}
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={openPopup}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>You must have 12-18 credits per semester. Please contact your advisor if you plan to underload/overload a semester.</Typography>
                    </Popover>
                </div>
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

    const semesterBlocks = (semester) => {
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


        for (const [index, element] of semester.entries()) {
            let creditId = 'credit_count' + index;
            let creditCount = countCredits(element, creditId);
            blocks.push(<Grid item={true} xs={6} className='tableGrid'>
                <h2>{numbers[index]} Semester</h2>
                {/* <h4 id={creditId}>Credits: {countCredits(element, creditId)}</h4> */}
                {creditWarningPopup(creditId, creditCount)}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {element.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.course_id}</TableCell>
                                    <TableCell onClick={handleDialogOpen}>{row.course_name}</TableCell>
                                    <TableCell>{row.credit_num}</TableCell>
                                    <TableCell>
                                        <Button color="error" onClick={() => handleDeleteCourse(row, element)}>
                                            <DeleteIcon></DeleteIcon>
                                        </Button>
                                        {/* <Button color = "error" onClick={handleClickOpen}>
                                                <DeleteIcon></DeleteIcon>
                                            </Button>
                                            <Dialog
                                            open={open}
                                            
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            overlayStyle={{backgroundColor: 'transparent'}}
                                            >
                                            <DialogTitle id="alert-dialog-title">
                                            </DialogTitle>
                                            <DialogActions>
                                            <Button onClick={() => handleClickConfirm(element)}>Confirm</Button>
                                            <Button onClick={handleClickClose} autoFocus>
                                            Cancel
                                            </Button>
                                            </DialogActions>
                                            </Dialog>  */}
                                    </TableCell>
                                    {checkFlag(row.course_id)}
                                    <SimpleDialog
                                        open={dialogOpen}
                                        onClose={handleClose}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={() => addToSemester(element)}>Add</Button>
            </Grid>);
        }
        return blocks;
    }

    let semesters = [];
    for (let i = 1; i < semNum + 1; i++) {
        semesters.push(eval("sem" + i));
    }

    const [selectedSemester, setSelectedSemester] = useState("");

    const addToSemester = (semester) => {
        setSelectedSemester(semester);
        setDrawerOpen(true);
    }

    const addCourse = (course) => {
        console.log(selectedSemester)
        if (selectedSemester != "") {
            console.log("semsterId " + selectedSemester);
            console.log("semesters " + semesters[0]);
            console.log("courseId " + course.courseId);
            Axios.post(`http://localhost:3001/prereq`, {
                semesterId: selectedSemester[0].semesterId,
                semesters: semesters,
                courseId: course.courseId,
            }).then((response) => {
                console.log(response.data);
                console.log(accountInfo[0].user_id);
                if (response.data) {
                    console.log("Prerequisites have been met!");
                    selectedSemester.push(course);
                    Axios.post(`http://localhost:3001/addCourse`, {
                        user_id: accountInfo[0].user_id,
                        semester_id: selectedSemester[0].semester_id,
                        course_id: course.course_id
                    }).then((response) => {
                        console.log(response);
                    });
                }
                else {
                    console.log("Prerequisites not met.");
                }
            });
        }
    }

    const [userSemIDs, setUserSemIDs] = useState([]);

    const getUserSemIDs = () => {
        Axios.post(`http://localhost:3001/userSemeseterIDs`, {
            user_id: user_id
        }).then((response) => {
            for (const elem of response.data) {
                userSemIDs.push(elem.semester_id);
            }
        });
    }

    useEffect(() => {
        getUserSemIDs();
    }, []);

    const [courseFlags, setCourseFlags] = useState([]);

    const courseFlagging = (userCourses) => {
        for (const course of userCourses) {
            // check semeseter placement
            if ((course.semester?.toLowerCase() == "fall" && userSemIDs.indexOf(course.semester_id) % 2 != 0) || (course.semester?.toLowerCase() == "spring" && userSemIDs.indexOf(course.semester_id) % 2 != 1)) {
                console.log(course.course_id + ": wrong semester!");
                if (!courseFlags.includes(course.course_id)) courseFlags.push(course.course_id);
            }
        }
    }

    courseFlagging(userCourses);

    const checkFlag = (courseId) => {
        console.log(courseId);
        console.log(courseFlags);
        if (courseFlags.includes(courseId)) {
            return (
                <TableCell>
                    <ErrorIcon sx={{color: 'red'}}></ErrorIcon>
                </TableCell>
            )
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
                                label="Course ID"
                            />
                        </div>
                        <div>
                            <TextField
                                id="course_name_input"
                                label="Course Name"
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
                                    <TableRow key={row.id} onClick={() => addCourse(row)}>
                                        <TableCell>{row.course_id}</TableCell>
                                        <TableCell>{row.course_name}</TableCell>
                                        <TableCell>{row.credit_num}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Drawer>
                <h1>{semNum} Semester Plan</h1>
                <Grid container spacing={0}>
                    {semesterBlocks(semesters)}
                </Grid>
                <div>
                    <Button onClick={() => handleAddSemester(accountInfo.user_id, semNum)}>Add One Semester</Button>
                </div>
                <div>
                    <Button onClick={() => handleDeleteSemester(accountInfo.user_id, semNum)}>Remove One Semester</Button>
                </div>
            </div>
        </div >
    );
}

export default Home;
