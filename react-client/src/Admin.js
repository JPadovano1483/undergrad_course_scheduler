import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Paper, Table, TableCell, TableContainer, TableBody, TableRow, Button} from "@mui/material";
import SimpleDialog from './Dialog';
import InputIcon from '@mui/icons-material/Input';
import Axios from 'axios';
import SearchCourse from "./SearchCourse";


function Admin() {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = React.useState('Fall');
    const [year, setYear] = React.useState('Even');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = (value) => {
        setDialogOpen(false);
    };
    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);   
    };

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

    let [searchedCourses, setSearchedCourses] = useState(null);

    function searchCourse() {
        let searchParam = document.querySelector('#course_search_input')?.value;
        if (searchParam && courseList.length != 0) {
            setSearchedCourses(SearchCourse(courseList, searchParam));
        }
    }

    function Search(props) {
        let courses = props.courses;
        let block = [];
        if (courses?.length != 0) {
            console.log(courses);
            return (
                <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {courses?.map((row) => (
                                    <TableRow key={row?.id}>
                                        <TableCell>{row?.course_id}</TableCell>
                                        <TableCell onClick={handleDialogOpen}>{row?.course_name}</TableCell>
                                        <TableCell>{row?.credit_num}</TableCell>
                                        <TableCell>{row?.scheduled_semester}</TableCell>
                                        <TableCell>{row?.scheduled_year}</TableCell>
                                        <TableCell>{row?.time}</TableCell>
                                        <TableCell>{row?.day}</TableCell>
                                        <SimpleDialog
                                            open={dialogOpen}
                                            onClose={handleClose}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            )
        }
    }

    const [accountInfo, setAccountInfo] = useState(() => {
        if (localStorage.getItem("user") !== null) {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (loggedInUser.is_admin) {
                return loggedInUser;
            }
            else {
                window.location.href = "http://localhost:3000/home";
            }
        }
        else if (sessionStorage.getItem("user") !== null) {
            const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
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
        Axios.post(`http://localhost:3001/searchCourse`, {
            course_id: courseId,
            course_name: courseName
        }).then((response) => {
            if (response.data.length > 0) {
                console.log("Course already exists!");
                document.querySelector('#errorMessage').style.color = 'red';
                document.querySelector('#errorMessage').innerHTML = "Course already exists!";
            }
            else {
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
                    document.querySelector('#courseID').value = "";
                    document.querySelector('#courseName').value = "";
                    document.querySelector('#description').value = "";
                    document.querySelector('#credits').value = "";
                    document.querySelector('#errorMessage').style.color = 'black';
                    document.querySelector('#errorMessage').innerHTML = "Upload Successful!";
                });
            }
        })
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

                <Search courses={searchedCourses}></Search>
              
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
                            id="courseName" 
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
                        <div className="dropdownSemester">
                            <select className="dropdownSem" value={semester} onChange={handleSemesterChange}>
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                        <div className="dropdownYear">
                            <select className="dropdownYr" value={year} onChange={handleYearChange}>
                                <option value="Even">Even</option>
                                <option value="Odd">Odd</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
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
                        <p id="errorMessage"></p>
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