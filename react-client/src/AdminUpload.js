import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useCSVReader, lightenDarkenColor, formatFileSize, useCSVDownloader } from "react-papaparse";
import { Alert, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";

function AdminUpload() {
    const [alignment, setAlignment] = useState('Courses');
    const [downloaderData, setDownloaderData] = useState([{
        'course_id': null,
        'course_name': null,
        'course_description': null,
        'credits': null,
        'semester': null,
        'year': null
    }]);
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        switch (newAlignment) {
            case 'Courses':
                setDownloaderData([{
                    'course_id': null,
                    'course_name': null,
                    'course_description': null,
                    'credits': null,
                    'semester': null,
                    'year': null
                }]);
                break;
            case 'Programs':
                setDownloaderData([{
                    'program_name': null,
                    'program_type': null,
                    'concentration_req': null,
                    'major_id': null
                }]);
                break
            default:
                setDownloaderData(null);
        }
    };
    const [empty, setEmpty] = useState(false);

    const [errorArray, setErrorArray] = useState([]);

    const getPrograms = async (programToAdd, count) => {
        let programArray = [];
        await Axios.get(`http://localhost:3001/allPrograms`).then((response) => {
            response.data.map((x, c) => {
                programArray.push(response.data[c].program_name);
            });
        });
        let add = true;
        programArray.every(element => {
            if (programToAdd.program_name === element) {
                setErrorArray(errorArray => [...errorArray, count]);
                add = false;
                return false;
            }
            return true;
        });
        if (add) {
            addPrograms(programToAdd);
        }
    }
    const addPrograms = (e) => {
        Axios.post(`http://localhost:3001/program`, {
            programName: e.program_name,
            programType: e.program_type,
            concentrationReq: e.concentration_req,
            major_id: e.major_id
        });
    }
    const addCourse = (e, c) => {
        Axios.post(`http://localhost:3001/course`, {
            courseId: e.course_id,
            courseName: e.course_name,
            courseDescription: e.course_description,
            credits: e.credits,
            semester: e.semester,
            year: e.year,
        }).then((response) => {
            if (response.data.errno === 1062) {
                setErrorArray(errorArray => [...errorArray, c]);
            }
        });
    }
    const { CSVDownloader } = useCSVDownloader();
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
    const errorBlock = (errors) => {
        let block = [];
        if (empty) {
            block.push(<div style={{ marginBottom: '10px' }}><Alert severity="error">The file is empty.</Alert></div>);
        } else {
            for (const [index] of errors.entries()) {
                block.push(<div style={{ marginBottom: '10px' }}><Alert severity="error">Error in row {errors[index]}. Element already exists.</Alert></div>);
            };
        }
        return block;
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
                <div>
                    <h3>What are you uploading?</h3>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Courses">Courses</ToggleButton>
                        <ToggleButton value="Programs">Programs</ToggleButton>
                        <ToggleButton value="Requirements">Requirements</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <h1>
                    {alignment} Upload
                </h1>
                <div className="inputContainer">
                    <CSVReader
                        onUploadAccepted={(results) => {
                            setErrorArray([]);
                            let count = 2;
                            results.data.forEach(element => {
                                switch (alignment) {
                                    case 'Courses':
                                        addCourse(element, count);
                                        break;
                                    case 'Programs':
                                        if (element.program_name === '') {
                                            setEmpty(true);
                                            break;
                                        } else {
                                            getPrograms(element, count);
                                        }
                                        //addPrograms(element, count);
                                        break;

                                }
                                count++;
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
                                                    <span style={styles.name}>Upload Successfull</span>
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
                        filename={JSON.stringify(alignment) + 'upload_template'}
                        bom={true}
                        config={{
                            delimiter: ',',
                        }}
                        data={downloaderData}
                    >
                        <Button variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >Download upload template</Button>
                    </CSVDownloader>
                </div>
                {errorBlock(errorArray)}
            </div>
        </>
    );
}

export default AdminUpload;