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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SimpleDialog from './Dialog';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';

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
    console.log(accountInfo);

    // const user_id = window.sessionStorage.getItem("user_id");
    // SimpleDialog.propTypes = {
    //     onClose: PropTypes.func.isRequired,
    //     open: PropTypes.bool.isRequired,
    // };
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

    const [semNumSelected, setSemNumSelected] = useState(0);
    
    const handleDialogOpen = () => {
        setDialogOpen(true);
        console.log('hello');
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

    // const [plan, setPlan] = useState([]);
    // const getPlan = (setPlan, userId) => {
    //     Axios.get(`http://localhost:3001/plan/${userId}`, {
    //         reqUser: accountInfo.user_id,
    //         targetUser: accountInfo.user_id,
    //         role: accountInfo.is_admin
    //     }).then((response) => {
    //         setPlan(response);
    //     });
    // }

    // useEffect(() => {
    //     getPlan(setPlan, accountInfo.user_id)
    // }, []);

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

    
    const changeStyle = () => {
        const element = document.getElementById("styleTest");
        element.classList.toggle('green');
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

    const semesterBlocks = (semTotal, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10, sem11, sem12) => {
        const semesters = [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10, sem11, sem12];
        console.log(semesters);
        let blocks = [];
        let numbers = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];

        // trying to take in all plan and split it into the semesters
        // let semesters = [];

        // if (plan.data) {
        //     let numSemesters = plan.data[plan.data.length - 1].semester_id - plan.data[0].semester_id + 1;
        //     let curSemId = plan.data[0].semester_id;
        //     for (let i = 0; i < numSemesters; i++) {
        //         for (let j = 0; j < plan.data.length; j++) {
        //             if (plan.data[j].semester_id == curSemId) {
        //                 semesters.push(plan.data[j]);
        //             }
        //             else {
        //                 curSemId++;
        //             }
        //         }
        //     };

        const countCredits = (semester, id) => {
            console.log(semester);
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
            // if (semesters[i][0] !== undefined) {
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
                                        <TableCell>{row?.course_id}</TableCell>
                                        <TableCell onClick={handleDialogOpen}>{row?.course_name}</TableCell>
                                        <TableCell>{row?.credit_num}</TableCell>
                                        <TableCell>
                                            <Button color="error" onClick={() => handleDeleteCourse(row, semesters[i])}>
                                            <DeleteIcon></DeleteIcon>
                                        </Button>
                                        <Button onClick={changeStyle}>
                                        <Checkbox
                                            sx={{
                                                color: green[800],
                                                '&.Mui-checked': {
                                                color: green[600],
                                                },
                                            }}
                                            /> 
                                       </Button>
                                        {/* <Button color = "error" onClick={handleClickOpen}>
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
                                        <SimpleDialog
                                            open={dialogOpen}
                                            onClose={handleClose}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={() => addToSemester(semesters[i], i + 1)}>Add</Button>
                </Grid>);
            // }
        }
        return blocks;
    }

    // let semesters = [];
    // for (let i = 1; i < semTotal + 1; i++) {
    //     semesters.push(eval("sem" + i));
    // }
    // console.log(semesters);

    const [selectedSemester, setSelectedSemester] = useState("");

    const addToSemester = (semester, semesterNum) => {
        setSelectedSemester(semester);
        setSemNumSelected(semesterNum);
        setDrawerOpen(true);
    }

    const addCourse = (course) => {
        console.log(selectedSemester);
        if (selectedSemester !== "") {
            console.log(selectedSemester);
            console.log(course);
            console.log("courseId: " + course.course_id);
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
                console.log(response);
                console.log(response[0].data);
                console.log(response[1].data);
                let satisfied = true;
                if (response[0].data.length > 0) {
                    const grades = ["F", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
                    // checks if the perequisite courses are found in a previous semester and have a passing grade or have no grade yet
                    for (let i = 0; i < response[0].data.length; i++) {
                        const classPassed = response[1].data.some((course) => {
                            return course.course_id == response[0].data[i].prerequisite_id && (course.grade === null || grades.findIndex(element => element == course.grade) >= grades.findIndex(element => element == response[0].data[i].grade_req));
                        });
                        console.log(!classPassed);
                        if (!classPassed) {
                            satisfied = false;
                        }
                    }
                }
                if (satisfied) {
                    console.log("Prerequisites have been met!");
                    selectedSemester.push(course);
                    Axios.post(`http://localhost:3001/addCourse`, {
                        semester_id: semNumSelected,
                        course_id: course.course_id,
                        user_id: accountInfo.user_id
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

    // const saveSemesters = () => {
    //     Axios.post(`http://localhost:3001/updateSemesters`, {
    //         user_id: 1,
    //         semesters: semesters
    //   }).then((response) => {
    //       console.log(response);
    //   });
    // }


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
