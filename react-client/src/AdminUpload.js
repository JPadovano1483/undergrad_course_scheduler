import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useCSVReader, lightenDarkenColor, formatFileSize, useCSVDownloader } from "react-papaparse";
import { Button } from "@mui/material";

function AdminUpload() {
    const [course_id, setCourse_id] = useState("");
    const [course_name, setCourse_name] = useState("");
    const [course_description, setCourse_description] = useState("");
    const [course_credits, setCourse_credits] = useState("");

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
        console.log("Adding  courses.");
        Axios.post(`http://localhost:3001/course`, {
            courseId: course_id,
            courseName: course_name,
            courseDescription: course_description,
            credit: course_credits,
        }).then((response) => {
            console.log(response);
        });
    }
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const { CSVDownloader, Type } = useCSVDownloader();
    const GREY = '#CCC';
    const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
    const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
    const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
        DEFAULT_REMOVE_HOVER_COLOR,
        40
    );
    const GREY_DIM = '#686868';

    const styles = {
        zone: {
            alignItems: 'center',
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: GREY,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding: 20,
        },
        file: {
            background: 'linear-gradient(to bottom, #EEE, #DDD)',
            borderRadius: 20,
            display: 'flex',
            height: 120,
            width: 120,
            position: 'relative',
            zIndex: 10,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        info: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight: 10,
        },
        size: {
            backgroundColor: GREY_LIGHT,
            borderRadius: 3,
            marginBottom: '0.5em',
            justifyContent: 'center',
            display: 'flex',
        },
        name: {
            backgroundColor: GREY_LIGHT,
            borderRadius: 3,
            fontSize: 12,
            marginBottom: '0.5em',
        },
        progressBar: {
            bottom: 14,
            position: 'absolute',
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
        },
        zoneHover: {
            borderColor: GREY_DIM,
        },
        default: {
            borderColor: GREY,
        },
        remove: {
            height: 23,
            position: 'absolute',
            right: 6,
            top: 6,
            width: 23,
        },
    };
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
    );

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
                        onUploadAccepted={(results) => {
                            console.log(results.data);
                            results.data.forEach(element => {
                                console.log(element);
                                setCourse_id(element.course_id);
                                setCourse_name(element.course_name);
                                setCourse_description(element.course_description);
                                setCourse_credits(element.credits);
                                addCourse();
                            });
                            setZoneHover(false);
                        }}
                        config={{
                            header: true
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setZoneHover(true);
                        }}
                        onDragLeave={(event) => {
                            event.preventDefault();
                            setZoneHover(false);
                        }}
                    >
                        {({
                            getRootProps,
                            acceptedFile,
                            ProgressBar,
                            getRemoveFileProps,
                            Remove,
                        }) => (
                            <>
                                <div
                                    {...getRootProps()}
                                    style={Object.assign(
                                        {},
                                        styles.zone,
                                        zoneHover && styles.zoneHover
                                    )}
                                >
                                    {acceptedFile ? (
                                        <>
                                            <div style={styles.file}>
                                                <div style={styles.info}>
                                                    <span style={styles.size}>
                                                        {formatFileSize(acceptedFile.size)}
                                                    </span>
                                                    <span style={styles.name}>{acceptedFile.name}</span>
                                                </div>
                                                <div style={styles.progressBar}>
                                                    <ProgressBar />
                                                </div>
                                                <div
                                                    {...getRemoveFileProps()}
                                                    style={styles.remove}
                                                    onMouseOver={(event) => {
                                                        event.preventDefault();
                                                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                                    }}
                                                    onMouseOut={(event) => {
                                                        event.preventDefault();
                                                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                                    }}
                                                >
                                                    <Remove color={removeHoverColor} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        'Drop CSV file here or click to upload'
                                    )}
                                </div>
                            </>
                        )}
                    </CSVReader>
                    <CSVDownloader
                        filename={'course_upload_template'}
                        bom={true}
                        config={{
                            delimiter: ',',
                        }}
                        data={[
                            {
                                'course_id': null,
                                'course_name': null,
                                'course_description': null,
                                'credits': null,
                                'semester': null,
                                'year': null
                            }
                        ]}
                    >
                        <Button variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >Download upload template</Button>
                    </CSVDownloader>
                </div>
            </div>
        </>
    );
}

export default AdminUpload;