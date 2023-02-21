import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState } from 'react';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import Axios from 'axios';

function AdminEdit() {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");

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

    const editCourse = () => {
        console.log("Deleting and Updating Course.");
        Axios.post(`http://localhost:3001/courseEdit`, {
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
                        <button className="dropbtn">Edit ▼
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="/admin">Create</a>
                            <a href="/adminupload">Upload</a>
                        </div>
                    </div>
                </div>
                <h1>
                    Course Search
                </h1>
                <div>
                    <TextField
                        id="course_name_input"
                        label="Course Name"
                        sx={{}}
                        />
                </div>
                <div>
                    <Button
                        type="submit" 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Search
                    </Button>
                </div>
              
                <h1>Please enter course information to be edited</h1>
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
                        <Button variant="contained" startIcon={<InputIcon />} sx={{ left: '87%' }} onClick={editCourse}>
                            <input hidden type="submit" value="Submit"/>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );

}

export default AdminEdit;