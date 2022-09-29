import './home.css';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navigation from './navigation';
import Axios from 'axios';


function Home() {
    const sem1 = () => {
        Axios.get("http://localhost:3001/users").then((response) => {
            console.log(response.data);
        });
    }
    sem1();
    return (
        <div className="App">
            <Navigation />
            <div className='tableContainer'>
                <h1>8 Semester Plan</h1>
                <Grid container spacing={0}>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

// retrieve a user's 8-semester plan 
// function getPlan(user) {
//     const db = require("../server/server");

//     db.query('SELECT course_id, course_name, credits FROM heroku_a19411dd68d921e.course join heroku_a19411dd68d921e.semester_course using(course_id) join heroku_a19411dd68d921e.semester using(semester_id) join heroku_a19411dd68d921e.plan using(plan_id) join heroku_a19411dd68d921e.user using(user_id) where plan_id=1;', (err, res) => {
//     return res.forEach(element => {
//         console.log(element);
//     });
//     });
// }

// display semester blocks with function maybe

export default Home;
