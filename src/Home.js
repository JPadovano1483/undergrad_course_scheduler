import './home.css';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navigation from './navigation';
import DeleteIcon from '@mui/icons-material/Delete';

const isShown = false;
const handleClick = event => {
    console.log("Click");
    // setIsShown(true);
    console.log(isShown)
}
function Home() {
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

export default Home;
