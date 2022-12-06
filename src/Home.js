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

function Home() {
    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

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

    const [plan, setPlan] = useState([]);
    const getPlan = (setPlan, userId) => {
        Axios.get(`http://localhost:3001/plan/${userId}`).then((response) => {
            setPlan(response);
        });
    }

    useEffect(() => {
        getPlan(setPlan, 1)
    }, []);



    const getSemester = (setSem, id) => {
        Axios.get(`http://localhost:3001/semester/${id}`).then((response) => {
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

    const checkPrereq = (courseId, sem1, sem2, sem3, sem4, sem5, sem6, sem7) => {
        Axios.get(`http://localhost:3001/prereq`, {
            courseId: courseId,
            sem1: sem1,
            sem2: sem2,
            sem3: sem3,
            sem4: sem4,
            sem5: sem5,
            sem6: sem6,
            sem7: sem7,
        }).then((response) => {
            return response;
        });
    };

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

    const semesterBlocks = (plan) => {
        let blocks = [];
        let numbers = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eigth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];
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
        for (const [index, element] of plan.entries()) {
            blocks.push(<Grid item={true} xs={6} className='tableGrid'>
                <h2>{numbers[index]} Semester</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {element.map((row) => (
                                <Draggable>
                                    <TableRow onClick={handleDialogOpen}>
                                        <TableCell>{row.course_id}</TableCell>
                                        <TableCell>{row.course_name}</TableCell>
                                        <TableCell>{row.credits}</TableCell>
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
                                        <SimpleDialog
                                            open={dialogOpen}
                                            onClose={handleClose}
                                        />
                                    </TableRow>
                                </Draggable>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={() => addToSemester(element)}>Add</Button>
            </Grid>);
        }
        return blocks;
    }

    const semesters = [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8];

    const [selectedSemester, setSelectedSemester] = useState("");

    const addToSemester = (semester) => {
        setSelectedSemester(semester);
        setDrawerOpen(true);
    }

    const addCourse = (course) => {
        if (selectedSemester != "") {
            selectedSemester.push(course);
            Axios.post(`http://localhost:3001/addCourse`, {
                user_id: 1,
                semester_id: selectedSemester[0].semester_id,
                course_id: course.course_id
            }).then((response) => {
                console.log(response);
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
                                    <TableRow onClick={() => addCourse(row)}>
                                        <TableCell>{row.course_id}</TableCell>
                                        <TableCell>{row.course_name}</TableCell>
                                        <TableCell>{row.credits}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Drawer>
                <h1>8 Semester Plan</h1>
                <Grid container spacing={0}>
                    {semesterBlocks(semesters)}
                </Grid>
                {/* <Button onClick={saveSemesters}>Save</Button> */}
            </div>
        </div >
    );
}

export default Home;
