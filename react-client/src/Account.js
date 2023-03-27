import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import Navigation from "./navigation";
import "./css/account.css"
import Axios from 'axios';
import { useEffect } from 'react';
import { AccountTree } from '@mui/icons-material';

function Account() {
    let accountInfo = {};
    if (localStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else if (sessionStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else {
        window.location.href = "http://localhost:3000";
    }
    console.log(accountInfo);

    const [majorOptions, setMajorOptions] = useState([]);
    const getMajors = () => {
        Axios.post(`http://localhost:3001/getMajors`).then((response) => {
            setMajorOptions(response.data);
        });
    }
    useEffect(() => {
        getMajors();
    }, []);

    const [minorOptions, setMinorOptions] = useState([]);
    const getMinors = () => {
        Axios.post(`http://localhost:3001/getMinors`).then((response) => {
            setMinorOptions(response.data);
        });
    }
    useEffect(() => {
        getMinors();
    }, []);

    const [concentrationOptions, setConcentrationOptions] = useState([]);
    const getConcentrations = () => {
        Axios.post(`http://localhost:3001/getConcentrations`).then((response) => {
            setConcentrationOptions(response.data);
        });
    }
    useEffect(() => {
        getConcentrations();
    }, []);

    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("");
    const [concentration, setConcentration] = useState("");
    const [password, setPassword] = useState("");
    const [currentMajor, setCurrentMajor] = useState("None");
    const [currentMinor, setCurrentMinor] = useState("None");
    const [currentConcentration, setCurrentConcentration] = useState("None");
    const [majorId, setMajorId] = useState(0);
    const [minorId, setMinorId] = useState(0);
    const [concentrationId, setConcentrationId] = useState(0);

    const getProgramName = (programId) => {
        Axios.post(`http://localhost:3001/getProgramName`, {
            programId: programId
        }).then((response) => {
            console.log("set major");
            console.log(response.data[0].program_name);
            console.log(response.data[0].program_type);
            if (response.data[0].program_type === "major") {
                setMajor(response.data[0].program_name);
            }
            else if (response.data[0].program_type === "minor") {
                setMinor(response.data[0].program_name);
            }
            else if (response.data[0].program_type === "concentration") {
                setConcentration(response.data[0].program_name);
            }
        });
    }

    const handleMajorChange = (event) => {
        const programId = event.target.value;
        console.log(programId);
        setMajorId(programId);
        if (programId !== "") {
            getProgramName(programId);
        }
        else {
            setMajor("");
        }
    };

    const handleMinorChange = (event) => {
        const programId = event.target.value;
        console.log(programId);
        setMinorId(programId);
        if (programId !== "") {
            getProgramName(programId);
        }
        else {
            setMinor("");
        }
    };
    const handleConcentrationChange = (event) => {
        const programId = event.target.value;
        console.log(programId);
        setConcentrationId(programId);
        if (programId !== "") {
            getProgramName(programId);
        }
        else {
            setConcentration("");
        }
    };

    const updateAccount = () => {
        console.log("Updating user data.");
        const getOldProgramId = (programId, programType) => {
            console.log("program type: " + programType);
            Axios.post(`http://localhost:3001/getOldProgramId`, {
                userId: accountInfo.user_id,
                programType: programType
            }).then((response) => {
                return updateProgram(programId, response.data[0].program_id);
            });
        }

        const insertProgram = (programId) => {
            Axios.post(`http://localhost:3001/insertProgram`, {
                userId: accountInfo.user_id,
                programId: programId
            }).then((response) => {
                console.log(response);
            });
        }

        const updateProgram = (programId, oldProgramId) => {
            console.log("user id: " + accountInfo.user_id);
            console.log("program id: " + programId);
            console.log("old program id: " + oldProgramId);
            Axios.post(`http://localhost:3001/updateProgram`, {
                userId: accountInfo.user_id,
                programId: programId,
                oldProgramId: oldProgramId
            }).then((response) => {
                console.log(response);
            });
        }
        
        if (currentMajor === "None") {
            insertProgram(majorId);
            setCurrentMajor(major);
        }
        else {
            getOldProgramId(majorId, "major");
            setCurrentMajor(major);
        }
        if (currentMinor === "None") {
            insertProgram(minorId);
            setCurrentMinor(minor);
        }
        else {
            getOldProgramId(minorId, "minor");
            setCurrentMinor(minor);
        }
        if (currentConcentration === "None") {
            insertProgram(concentrationId);
            setCurrentConcentration(concentration);
        }
        else {
            getOldProgramId(concentrationId, "concentration");
            setCurrentConcentration(concentration);
        }
    }

    const updatePassword = () => {
        console.log("Updating user password.");
        Axios.post(`http://localhost:3001/updatePassword`, {
            password: password,
            userId: accountInfo.user_id
        }).then((response) => {
            console.log(response);
        });
    }

    const getProgram = () => {
        Axios.post("http://localhost:3001/program", {
            userId: accountInfo.user_id
        }).then((response) => {
            setCurrentMajor("None");
            setCurrentMinor("None");
            setCurrentConcentration("None");
            response.data.forEach(element => {
                if (element.program_type === "major") {
                    setCurrentMajor(element.program_name);
                }
                else if (element.program_type === "minor") {
                    setCurrentMinor(element.program_name);
                }
                else if (element.program_type === "concentration") {
                    setCurrentConcentration(element.program_name);
                }
            });
            // if (response.data[0] !== undefined) {
                console.log(response.data);
            // }
        });
    }
    useEffect(() => {
        getProgram();
    }, []);
    console.log(accountInfo);
    console.log(accountInfo?.first_name);
    console.log(accountInfo?.last_name);
    console.log(accountInfo?.username);
    console.log(accountInfo?.grade_level);

    let first_name = accountInfo?.first_name;
    let last_name = accountInfo?.last_name;
    let username = accountInfo?.username;
    let grade_level = accountInfo?.grade_level;
    let majorH = accountInfo?.program_name;
    const profileName = first_name?.concat(" ", last_name);
    const firstChar = first_name?.substr(0, 1);
    const secondChar = last_name?.substr(0, 1);
    const profileInitials = firstChar?.concat(secondChar);



    return (
        <>
            <Navigation />
            <div className="profileContainer">
                <form className="mike">
                    <Avatar
                        sx={{ bgcolor: '#D6742A', width: 200, height: 200, fontSize: 100 }}
                    >{profileInitials} </Avatar>

                </form>
                <section className="container">
                    <div className="floatleft">
                        <form>
                            <h2 className='username'> Profile </h2>
                            <h2 className='infoName'> {profileName} </h2>
                            <h2 className='userinfo'> Email </h2>
                            <h2> {username} </h2>
                            <h2 className='userinfo'> Grade Level </h2>
                            <h2> {grade_level} </h2>
                            <h2 className='userinfo'> Major </h2>
                            <h2> {currentMajor} </h2>
                            <h2 className='userinfo'> Minor </h2>
                            <h2> {currentMinor} </h2>
                            <h2 className='userinfo'> Concentration </h2>
                            <h2> {currentConcentration} </h2>


                        </form>
                    </div>
                    <div className="floatright">
                        <h2 className='account'>Update User Information</h2>

                        <div className="Major"> Select your Major</div>
                        <form className="Move">
                            <select onChange={handleMajorChange}>
                                {majorOptions.map((row) => (
                                    <option value={row?.program_id}>{row?.program_name}</option>
                                ))}
                                <option value="">--Select Major--</option>
                            </select>
                        </form>

                        <div className="Minor"> Select your Minor</div>
                        <form>
                            <select onChange={handleMinorChange}>
                                {minorOptions.map((row) => (
                                    <option value={row?.program_id}>{row?.program_name}</option>
                                ))}
                                <option value="">--No Minor--</option>
                            </select>
                        </form>


                        <div className="Concentration"> Select your Concentration</div>
                        <form>
                            <select onChange={handleConcentrationChange}>
                                {concentrationOptions.map((row) => (
                                    <option value={row?.program_id}>{row?.program_name}</option>
                                ))}
                                <option value="">--No Concentration--</option>
                            </select>

                            <h4> Major: {major} </h4>
                            <h4> Minor: {minor} </h4>
                            <h4> Concentration: {concentration} </h4>
                        </form>
                    </div>
                </section>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, marginLeft: 80 }}
                    onClick={updateAccount}
                >
                    Update Account
                </Button>

                <section className="container">
                    <div className="floatleft">
                    </div>
                    <div className="floatright">
                        <TextField
                            sx={{ my: 5, ml: 30 }}
                            label="New Password"
                            id="password"
                            type="password"
                            variant="filled"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />


                    </div>
                </section>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, marginLeft: 80 }}
                    onClick={updatePassword}
                >
                    Update Password
                </Button>
            </div>
        </>
    )
}
export default Account;