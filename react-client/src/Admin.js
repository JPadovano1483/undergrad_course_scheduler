import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Paper, Table, TableCell, TableContainer, TableBody, TableRow, Button} from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import Axios from 'axios';


function Admin() {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");


    //get all courses
    const [courseList, setCourseList] = useState([]);
    const getCourses = async (set) => {
        Axios.post(`http://localhost:3001/adminCourses`).then((response) => {
            setCourseList(response.data);
        });
    }
    useEffect(() => {
        getCourses();
    }, []);

    let [searchedCourse, setSearchedCourse] = useState(null);

    const searchCourse = () => {
        let search = document.querySelector('#course_search_input').value;
        setSearchedCourse(courseList.find(course => course.course_id == search || course.course_name == search));
        console.log(searchedCourse);
    }

    function Search(props) {
        let course = props.course;
        if (course) {
            return (
                // TODO: make this prettier
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell>{course.course_id}</TableCell>
                                <TableCell>{course.course_name}</TableCell>
                                <TableCell>{course.course_description}</TableCell>
                                <TableCell>{course.credit_num}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{course.scheduled_semester}</TableCell>
                                <TableCell>{course.scheduled_year}</TableCell>
                                <TableCell>{course.time}</TableCell>
                                <TableCell>{course.day}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    const [accountInfo, setAccountInfo] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser != null) {
            loggedInUser = JSON.parse(loggedInUser);
            if (loggedInUser.is_admin) {
                return loggedInUser;
            }
            else {
                window.location.href = "http://localhost:3000/home";
            }
        }
        else {
            window.location.href = "http://localhost:3000";
        }
    });

    const addCourse = () => {
        console.log("Adding course.");
        Axios.post(`http://localhost:3001/course`, {
            courseId: courseId,
            courseName: courseName,
            courseDescription: courseDescription,
            credits: credits,
            semester: semester,
            year: year,
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <>
            <Navigation />
            <div className='contentContainer'>
                <h1>
                    Select what you want to do
                </h1>
                {/* navbar from w3schools */}
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn">Create ▼
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="/adminedit">Edit</a>
                            <a href="/adminupload">Upload</a>
                        </div>
                    </div>
                </div>
                <h1>
                    Course Search
                </h1>
                <div>
                    <TextField
                        id="course_search_input"
                        label="Course ID or Name"
                    />
                </div>
                <div>
                    <Button
                        type="submit" 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={searchCourse}
                        >
                            Search
                    </Button>
                </div>

                <Search course={searchedCourse}></Search>
              
                <h1>Please enter course information</h1>
                <p style={{ color: 'red' }}>Fields marked with * are required</p>
                <div className="inputContainer">
                    <form>
                        <TextField 
                            label="Course ID *" 
                            id="courseID" 
                            variant="filled" 
                            sx={{ my: 1, width: '50%' }} 
                            onChange={(e) => {
                                setCourseId(e.target.value)
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Name of the Class *" 
                            id="name" 
                            sx={{ my: 1 }} 
                            variant="filled"
                            onChange={(e) => {
                                setCourseName(e.target.value)
                            }}
                        />
                         
                        <TextField 
                             
                            fullWidth 
                            label="Course Description *" 
                            id="description" 
                            multiline
                            rows={4} 
                            sx={{ my: 1 }} 
                            variant="filled"
                            onChange={(e) => {
                                setCourseDescription(e.target.value)
                            }}
                        />
                        <TextField 
                             
                             fullWidth 
                             label="Semester" 
                             id="name" 
                             sx={{ my: 1, width: '50%' }} 
                             variant="filled"
                             onChange={(e) => {
                                 setSemester(e.target.value)
                             }}
                         />
                          <TextField 
                             
                             fullWidth 
                             label="Year" 
                             id="name" 
                             sx={{ my: 1, width: '50%' }} 
                             variant="filled"
                             onChange={(e) => {
                                 setYear(e.target.value)
                             }}
                         />
                         
                        <TextField 
                             
                            type={'number'} 
                            label="Credits *" 
                            id="credits" 
                            sx={{ my: 1, width: '50%' }}
                            InputProps={{ inputProps: { min: 0, max: 10 } }} 
                            variant="filled"
                            onChange={(e) => {
                                setCredits(e.target.value)
                            }} 
                        />
                        <br></br>
                        <Button variant="contained" startIcon={<InputIcon />} sx={{ left: '87%' }} onClick={addCourse}>
                            <input hidden type="submit" value="Submit"/>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );

}

export default Admin;