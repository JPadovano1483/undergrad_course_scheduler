import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import Axios from 'axios';
import { useCSVReader } from "react-papaparse";

function AdminUpload() {
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const styles = {
        csvReader: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
        },
        browseFile: {
            width: '20%',
        },
        acceptedFile: {
            border: '1px solid #ccc',
            height: 45,
            lineHeight: 2.5,
            paddingLeft: 10,
            width: '80%',
        },
        remove: {
            borderRadius: 0,
            padding: '0 20px',
        },
        progressBarBackgroundColor: {
            backgroundColor: 'red',
        },
    };
    const { CSVReader } = useCSVReader();
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
                <h1>
                    Select what you want to do
                </h1>
                {/* navbar from w3schools */}
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn">Upload ▼
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="/admin">Create</a>
                            <a href="/adminedit">Edit</a>
                        </div>
                    </div>
                </div>
                <h1>
                    Course Schedule Upload
                </h1>
                <div className="inputContainer">
                    <CSVReader
                        onUploadAccepted={results => {
                            setParsedCsvData(results.data);
                            console.log(results);
                        }}
                        config={{
                            header: true
                        }}
                    >
                        {({
                            getRootProps,
                            acceptedFile,
                            ProgressBar,
                            getRemoveFileProps,
                        }) => (
                            <>
                                <div style={styles.csvReader}>
                                    <button type='button' {...getRootProps()} style={styles.browseFile}>
                                        Browse file
                                    </button>
                                    <div style={styles.acceptedFile}>
                                        {acceptedFile && acceptedFile.name}
                                    </div>
                                    <button {...getRemoveFileProps()} style={styles.remove}>
                                        Remove
                                    </button>
                                </div>
                                <ProgressBar style={styles.progressBarBackgroundColor} />

                            </>
                        )}
                    </CSVReader>
                </div>
            </div>
        </>
    );

}

export default AdminUpload;