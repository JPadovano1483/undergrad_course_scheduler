import './home.css';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableBody, TableRow, Button} from '@mui/material';
import { Dialog, DialogTitle, DialogActions} from '@mui/material';
import Navigation from './navigation';
import Draggable from 'react-draggable';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';

function Home() {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className="App">
            <Navigation />
            <div className='contentContainer'>
                <h1>8 Semester Plan</h1>
                <Grid container spacing={0}>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>First Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
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
                                <Draggable>
                                <TableBody>
                                    {sem3.map((row) => (
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
                                    ))}
                                </TableBody>
                                </Draggable>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Fourth Semester</h2>
                        <TableContainer component={Paper}>
                            <Draggable>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem4.map((row) => (
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
                                    ))}
                                </TableBody>
                            </Table>
                            </Draggable>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Fifth Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableBody>
                                    {sem5.map((row) => (
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
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Home;
