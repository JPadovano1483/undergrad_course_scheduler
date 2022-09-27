import './home.css';
import * as React from 'react';
import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navigation from './navigation';

const handleClick = event => {
    console.log("Click")
}
function Home() {
    return (
        <div className="App">
            <Navigation />
            <div className='contentContainer'>
                <h1>8 Semester Plan</h1>
                <Grid container spacing={0}>
                    <Grid item={true} xs={6} className='tableGrid'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow onClick={handleClick}>
                                        <TableCell>Click Me</TableCell>
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

export default Home;
