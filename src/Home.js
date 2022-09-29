import './home.css';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navigation from './navigation';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const isShown = false;
const handleClick = event => {
    console.log("Click");
    // setIsShown(true);
    console.log(isShown)
}
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
            <div className='contentContainer'>
                <h1>8 Semester Plan</h1>
                {isShown && (
                    <p>Here is your content</p>
                )}
                <Grid container spacing={0}>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>First Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow onClick={handleClick}>
                                        <TableCell>Click Me</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <h2>Second Semester</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 645 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow onClick={handleClick}>
                                        <TableCell>Click Me</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Course Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Credits</TableCell>
                                        <TableCell><DeleteIcon></DeleteIcon></TableCell>
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
