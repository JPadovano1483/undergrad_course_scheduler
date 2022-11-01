import Navigation from "./navigation";
import './css/courses.css'
import { Paper, Table, TableCell, TableContainer, TableBody, TableRow, TableHead } from '@mui/material';

function AllCourses() {
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
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>CIS 191</TableCell>
                                <TableCell>Web Development: Client Side</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
export default AllCourses;