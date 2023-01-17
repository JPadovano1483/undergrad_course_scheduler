import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import Axios from 'axios';
import { Link } from "react-router-dom";

function Admin() {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [credits, setCredits] = useState(0);
    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("");
    const [concentration, setConcentration] = useState("");

    const addCourse = () => {
        console.log("Adding course.");
        Axios.post(`http://localhost:3001/course`, {
            courseId: courseId,
            courseName: courseName,
            courseDescription: courseDescription,
            credits: credits,
            major: major,
            minor: minor,
            concentration: concentration,
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <>
            <Navigation />
            <div className='contentContainer'>
                {/* navbar from w3schools */}
                <div class="navbar">
                    <div class="dropdown">
                        <button class="dropbtn">Create 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="/admin">Create</a>
                            <a href="/adminedit">Edit</a>
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
                             label="Major" 
                             id="name" 
                             sx={{ my: 1, width: '50%' }} 
                             variant="filled"
                             onChange={(e) => {
                                 setMajor(e.target.value)
                             }}
                         />
                          <TextField 
                             
                             fullWidth 
                             label="Minor" 
                             id="name" 
                             sx={{ my: 1, width: '50%' }} 
                             variant="filled"
                             onChange={(e) => {
                                 setMinor(e.target.value)
                             }}
                         />
                            <TextField 
                             
                             fullWidth 
                             label="Concentration" 
                             id="name" 
                             sx={{ my: 1, width: '50%' }} 
                             variant="filled"
                             onChange={(e) => {
                                 setConcentration(e.target.value)
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
                        <h4>Days class will be offered: </h4>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Monday" />
                            <FormControlLabel control={<Checkbox />} label="Tuesday" />
                            <FormControlLabel control={<Checkbox />} label="Wednesday" />
                            <FormControlLabel control={<Checkbox />} label="Thursday" />
                            <FormControlLabel control={<Checkbox />} label="Friday" />
                        </FormGroup>
                        <h6>Time:</h6>
                        <TimeRangePicker clock={null} />
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