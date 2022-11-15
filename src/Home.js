import './css/home.css';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableBody, TableRow, IconButton, Drawer, Input, Button, Button} from '@mui/material';
import { Dialog, DialogTitle, DialogActions} from '@mui/material';
import Navigation from './navigation';
import Draggable from 'react-draggable';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SimpleDialog from './Dialog'

function Home() {
    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        console.log('Im open');
        setDialogOpen(true);
    };

    const handleClose = (value) => {
        setDialogOpen(false);
    };
    const drawerWidth = 350;
    // could try to get all courses and filter down by semester_id
    const [sem1, setSem1] = useState([]);
    const [sem2, setSem2] = useState([]);
    const [sem3, setSem3] = useState([]);
    const [sem4, setSem4] = useState([]);
    const [sem5, setSem5] = useState([]);
    const [sem6, setSem6] = useState([]);
    const [sem7, setSem7] = useState([]);
    const [sem8, setSem8] = useState([]);
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
        switch(criteria) {
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
                }} open={drawerOpen} anchor={"right"} onClose={() => setDrawerOpen(false)}>
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
                                    <TableRow>
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
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>First Semester</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {sem1.map((row) => (
                                        <Draggable>
                                            <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell> 
                                                <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                overlayStyle={{backgroundColor: 'transparent'}}
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog> 
                                            </TableCell>
                                        </TableRow>
                                     </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Second Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem2.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                       </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Third Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem3.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Fourth Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem4.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Fifth Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem5.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog class = 'alertTest'
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Sixth Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem6.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Seventh Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem7.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Eighth Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem8.map((row) => (
                                        <Draggable>
                                        <TableRow>
                                            <TableCell>{row.course_id}</TableCell>
                                            <TableCell>{row.course_name}</TableCell>
                                            <TableCell>{row.credits}</TableCell>
                                            <TableCell>
                                            <Button color = "error" onClick={handleClickOpen}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete this course?"}
                                                </DialogTitle>
                                                <DialogActions>
                                                <Button onClick={handleClose}>Confirm</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                Cancel
                                                </Button>
                                                </DialogActions>
                                                </Dialog>     
                                            </TableCell>
                                        </TableRow>
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
}

export default Home;
