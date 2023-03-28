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
    const [majorId, setMajorId] = useState(0);
    const [minorId, setMinorId] = useState(0);
    const [concentrationId, setConcentrationId] = useState(0);

    const handleMajorChange = (event) => {
        const program = event.target.value;
        setMajorId(program.program_id);
        setMajor(program.program_name);
    };

    const handleMinorChange = (event) => {
        const program = event.target.value;
        setMinorId(program.program_id);
        setMinor(program.program_name);
    };
    const handleConcentrationChange = (event) => {
        const program = event.target.value;
        setConcentrationId(program.program_id);
        setConcentration(program.program_name);
    };

    const updateAccount = () => {
        console.log("Updating user data.");
        if (currentMajor === "None") {
            Axios.post(`http://localhost:3001/insertMajor`, {
                userId: accountInfo.user_id,
                majorId: majorId
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            Axios.post(`http://localhost:3001/updateMajor`, {
                userId: accountInfo.user_id,
                majorId: majorId
            }).then((response) => {
                console.log(response);
            });
        }
        if (currentMinor === "None") {
            Axios.post(`http://localhost:3001/insertMinor`, {
                userId: accountInfo.user_id,
                minorId: minorId
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            Axios.post(`http://localhost:3001/updateMinor`, {
                userId: accountInfo.user_id,
                minorId: minorId
            }).then((response) => {
                console.log(response);
            });
        }
        if (currentConcentration === "None") {
            Axios.post(`http://localhost:3001/insertConcentration`, {
                userId: accountInfo.user_id,
                concentrationId: concentrationId
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            Axios.post(`http://localhost:3001/updateConcentration`, {
                userId: accountInfo.user_id,
                concentrationId: concentrationId
            }).then((response) => {
                console.log(response);
            });
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

    const [currentMajor, setCurrentMajor] = useState("None");
    const [currentMinor, setCurrentMinor] = useState("None");
    const [currentConcentration, setCurrentConcentration] = useState("None");
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
                            <select id = "selectMajor" value={major} onChange={handleMajorChange}>
                                {majorOptions.map((row) => (
                                    <option value={row}>{row?.program_name}</option>
                                ))}
                            </select>
                        </form>

                        <div className="Minor"> Select your Minor</div>
                        <form>
                            <select id ="selectMinor" value={minor} onChange={handleMinorChange}>
                                {minorOptions.map((row) => (
                                    <option value={row}>{row?.program_name}</option>
                                ))}
                                <option value="">--No Minor--</option>
                            </select>
                        </form>


                        <div className="Concentration"> Select your Concentration</div>
                        <form>
                            <select id ="selectConcentration" value={concentration} onChange={handleConcentrationChange}>
                                {concentrationOptions.map((row) => (
                                    <option value={row}>{row?.program_name}</option>
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
                    <div>
                        <TextField
                            sx={{ my: 5, ml: -10 }}
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