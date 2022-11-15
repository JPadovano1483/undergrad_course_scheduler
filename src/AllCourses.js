import Navigation from "./navigation";
import './courses.css'
import { Paper, Table, TableCell, TableContainer, TableBody, TableRow, TableHead } from '@mui/material';
import Axios from 'axios';
import { useState, useEffect } from 'react';

function AllCourses() {
    const [courses, setCourseList] = useState([]);

    const getCourses = (setCourseList) => {
        Axios.get(`http://localhost:3001/courses`).then((response) => {
            setCourseList(response.data);
        });
    }

    useEffect(() => {
        getCourses(setCourseList);
    }, []);

    return (
        <>
            <Navigation />
            <div className="contentContainer">
                <h1>
                    All Courses
                </h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 645 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Course ID</TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Credits</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((row) => (
                                <TableRow>
                                    <TableCell>{row.course_id}</TableCell>
                                    <TableCell>{row.course_name}</TableCell>
                                    <TableCell>{row.credits}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
export default AllCourses;